import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * 生成统一的测试报告页面
 */
function generateUnifiedReport() {
  const reports = {
    vitest: null,
    playwright: null,
  }

  // 读取 Vitest 结果（从新目录）
  const vitestResultsPath = join(process.cwd(), 'test-vitest-results/vitest-results.json')
  if (existsSync(vitestResultsPath)) {
    try {
      const vitestData = JSON.parse(readFileSync(vitestResultsPath, 'utf-8'))

      // Vitest v4 的 JSON 格式可能是数组或对象
      // 如果是数组，需要聚合所有测试文件的结果
      let total = 0
      let passed = 0
      let failed = 0
      let duration = 0
      let startTime = null
      let endTime = null

      if (Array.isArray(vitestData)) {
        // 数组格式：每个元素是一个测试文件的结果
        vitestData.forEach(file => {
          total += file.numTotalTests || 0
          passed += file.numPassedTests || 0
          failed += file.numFailedTests || 0
          duration += file.duration || 0
          if (!startTime || (file.startTime && file.startTime < startTime)) {
            startTime = file.startTime
          }
          if (!endTime || (file.endTime && file.endTime > endTime)) {
            endTime = file.endTime
          }
        })
      } else {
        // 对象格式：单个汇总结果
        total = vitestData.numTotalTests || 0
        passed = vitestData.numPassedTests || 0
        failed = vitestData.numFailedTests || 0
        duration = vitestData.duration || 0
        startTime = vitestData.startTime
        endTime = vitestData.endTime
      }

      // 如果total为0，使用passed + failed计算
      if (total === 0 && (passed > 0 || failed > 0)) {
        total = passed + failed
      }

      // 计算总耗时：如果有endTime和startTime，使用它们的差值；否则使用duration
      let totalDuration = duration
      if (startTime && endTime) {
        totalDuration = endTime - startTime
      } else if (startTime) {
        totalDuration = Date.now() - startTime
      }

      reports.vitest = {
        total,
        passed,
        failed,
        duration: totalDuration,
      }
    } catch (e) {
      console.warn('Failed to parse Vitest results:', e.message)
      console.warn('File path:', vitestResultsPath)
    }
  } else {
    console.warn('Vitest results file not found:', vitestResultsPath)
  }

  // 读取 Playwright 结果（从新目录）
  const playwrightResultsPath = join(process.cwd(), 'test-playwright-results/e2e-results.json')
  if (existsSync(playwrightResultsPath)) {
    try {
      const playwrightData = JSON.parse(readFileSync(playwrightResultsPath, 'utf-8'))
      const stats = playwrightData.stats || {}

      // Playwright的JSON格式：expected是通过的，unexpected是失败的
      const passed = stats.expected || 0
      const failed = stats.unexpected || 0
      // 如果total为0或不存在，使用passed + failed计算
      const total = stats.total > 0 ? stats.total : passed + failed

      reports.playwright = {
        total,
        passed,
        failed,
        duration: stats.duration || 0,
      }
    } catch (e) {
      console.warn('Failed to parse Playwright results:', e.message)
    }
  } else {
    console.warn('Playwright results file not found:', playwrightResultsPath)
  }

  // 生成 HTML 报告（保存到 test-results 目录，作为统一入口）
  const html = generateHTML(reports)
  const outputPath = join(process.cwd(), 'test-results/unified-report.html')
  writeFileSync(outputPath, html, 'utf-8')
  console.log(`✅ 统一测试报告已生成: ${outputPath}`)

  // 打印调试信息
  console.log('📊 报告数据:')
  console.log('  Vitest:', reports.vitest)
  console.log('  Playwright:', reports.playwright)
}

function generateHTML(reports) {
  // 计算总测试数：优先使用各框架的total，如果为0则使用passed + failed
  const vitestTotal = reports.vitest?.total || (reports.vitest ? reports.vitest.passed + reports.vitest.failed : 0)
  const playwrightTotal =
    reports.playwright?.total || (reports.playwright ? reports.playwright.passed + reports.playwright.failed : 0)

  const totalTests = vitestTotal + playwrightTotal
  const totalPassed = (reports.vitest?.passed || 0) + (reports.playwright?.passed || 0)
  const totalFailed = (reports.vitest?.failed || 0) + (reports.playwright?.failed || 0)
  const totalDuration = (reports.vitest?.duration || 0) + (reports.playwright?.duration || 0)

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>统一测试报告</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 30px;
    }
    h1 {
      color: #333;
      margin-bottom: 30px;
      border-bottom: 2px solid #42b983;
      padding-bottom: 10px;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .summary-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    .summary-card.success { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); }
    .summary-card.danger { background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%); }
    .summary-card.info { background: linear-gradient(135deg, #3494e6 0%, #ec6ead 100%); }
    .summary-card h3 {
      font-size: 14px;
      opacity: 0.9;
      margin-bottom: 10px;
    }
    .summary-card .value {
      font-size: 36px;
      font-weight: bold;
    }
    .section {
      margin-bottom: 30px;
    }
    .section h2 {
      color: #555;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
    .test-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
    }
    .test-card {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #42b983;
    }
    .test-card.failed { border-left-color: #eb3349; }
    .test-card h4 {
      color: #333;
      margin-bottom: 10px;
    }
    .test-stats {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #666;
      flex-wrap: wrap;
      gap: 8px;
    }
    .test-stats span {
      padding: 4px 8px;
      border-radius: 4px;
      background: white;
    }
    .test-stats .passed { color: #11998e; }
    .test-stats .failed { color: #eb3349; }
    .links {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
    .links a {
      display: inline-block;
      margin-right: 15px;
      padding: 10px 20px;
      background: #42b983;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background 0.3s;
    }
    .links a:hover {
      background: #35a372;
    }
    .timestamp {
      color: #999;
      font-size: 12px;
      margin-top: 20px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 统一测试报告</h1>

    <div class="summary">
      <div class="summary-card info">
        <h3>总测试数</h3>
        <div class="value">${totalTests}</div>
      </div>
      <div class="summary-card success">
        <h3>通过</h3>
        <div class="value">${totalPassed}</div>
      </div>
      <div class="summary-card ${totalFailed > 0 ? 'danger' : 'success'}">
        <h3>失败</h3>
        <div class="value">${totalFailed}</div>
      </div>
      <div class="summary-card info">
        <h3>总耗时</h3>
        <div class="value">${formatDuration(totalDuration)}</div>
      </div>
    </div>

    <div class="section">
      <h2>单元测试 & 集成测试 (Vitest)</h2>
      <div class="test-details">
        ${
          reports.vitest
            ? `
          <div class="test-card ${reports.vitest.failed > 0 ? 'failed' : ''}">
            <h4>Vitest 测试结果</h4>
            <div class="test-stats">
              <span>总计: ${reports.vitest.total}</span>
              <span class="passed">通过: ${reports.vitest.passed}</span>
              <span class="failed">失败: ${reports.vitest.failed}</span>
              <span>耗时: ${formatDuration(reports.vitest.duration)}</span>
            </div>
          </div>
        `
            : '<p style="color: #999;">暂无数据</p>'
        }
      </div>
    </div>

    <div class="section">
      <h2>E2E 测试 (Playwright)</h2>
      <div class="test-details">
        ${
          reports.playwright
            ? `
          <div class="test-card ${reports.playwright.failed > 0 ? 'failed' : ''}">
            <h4>Playwright 测试结果</h4>
            <div class="test-stats">
              <span>总计: ${reports.playwright.total}</span>
              <span class="passed">通过: ${reports.playwright.passed}</span>
              <span class="failed">失败: ${reports.playwright.failed}</span>
              <span>耗时: ${formatDuration(reports.playwright.duration)}</span>
            </div>
          </div>
        `
            : '<p style="color: #999;">暂无数据</p>'
        }
      </div>
    </div>

    <div class="links">
      <a href="../test-vitest-results/vitest-report.html" target="_blank">查看 Vitest 详细报告</a>
      <a href="../test-playwright-results/html-report/index.html" target="_blank">查看 Playwright 详细报告</a>
      <a href="../test-vitest-results/coverage/index.html" target="_blank">查看代码覆盖率</a>
    </div>

    <div class="timestamp">
      生成时间: ${new Date().toLocaleString('zh-CN')}
    </div>
  </div>
</body>
</html>`
}

function formatDuration(ms) {
  if (!ms) return '0s'
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  }
  return `${seconds}s`
}

generateUnifiedReport()

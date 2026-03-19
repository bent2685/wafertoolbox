# 提交代码&推送到远端工作流

## 任务定义

你的任务是帮助开发者编写commit message、提交代码、同步代码、推送代码到远端，你需要遵守的提交规范如下:

## 提交类型 (Type)

- **feat**: 新功能
- **fix**: 修复bug
- **docs**: 文档变更
- **style**: 代码格式化调整（不影响代码逻辑）
- **refactor**: 代码重构
- **perf**: 性能优化
- **test**: 测试相关
- **chore**: 构建过程或辅助工具的变动
- **reactor**: 项目结构调整

## 提交格式

```
<type>: <主要完成的功能>

- 新增 xxx
- 修改 xxx
- 移除 xxx
- 优化 xxx
```

## 注意:

- 严谨在commit信息后面添加任何meta信息接着提交者信息，保持commit整洁

---

## 示例

### feat 示例
```
feat: 添加食材类别价格同期对比功能

- 新增 FoodCateSamePeriodVo 用于返回同期对比数据
- 新增 catePeriodCompareForMon 和 catePeriodCompareForYear SQL 查询
- 修改 xxxx
- 优化 生鲜类按月对比，标品类按年对比

## 注意事项

1. 提交信息使用中文
2. 首行简洁明了，概括主要变更
3. 详情内容使用项目符号列表
4. 每个条目以动词加空格开头且只能是（新增、修改、移除、优化）
5. **绝对禁止添加任何元信息、署名、尾缀**（包括但不限于 "🤖 Generated with"、"Co-Authored-By" 等）
6. 保持提交信息的一致性和可读性
7. 提交信息必须干净整洁，只包含实际变更描述
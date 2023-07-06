# 使用模版创建 Workflow

Authing 针对一些“身份源”创建了模板，可以在模板的基础上简单配置即可创建 Workflow。

# 以飞书为例配置上游同步

<p style="margin: 30px auto;">
  <video id="video" width="768px" controls="controls" preload="none" poster="../static/上游封面图.jpg">
    <source id="mp4" src="https://files.authing.co/videos/workflow-downstream-template.mp4" type="video/mp4">
  </video>
</p>


说明：需要配置的节点是“拉取部门目录数据”、“拉取用户目录数据”、“对比用户数据”、“对比部门数据”。

# 以飞书为例配置下游同步

<p style="margin: 30px auto;">
  <video id="video" width="768px" controls="controls" preload="none" poster="../static/下游封面图.jpg">
    <source id="mp4" src="https://files.authing.co/videos/workflow-upstream-template.mp4" type="video/mp4">
  </video>
</p>

说明：需要重点关注的节点“拉取用户目录数据”、“拉取组织目录数据”、部门和用户的创建&更新节点。

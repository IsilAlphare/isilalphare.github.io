---
title: "24Fall-NJUSE 【LLM4SE】 实验文档"
date: 2025-10-17
category: "技术札记"
tags:
  - "NJU"
  - "软件工程"
sourceDoc: "https://bytedance.larkoffice.com/docx/KTtWd9M6Io3OIixveaFc8vlvncc"
slug: "njuse-llm4se"
---

# 24Fall-NJUSE 【LLM4SE】 实验文档

**来源：**Notion　**原发布时间：**发布日期: 2025-10-17; 创建时间: 2025-10-17 03:47:06.528Z; 最后编辑时间: 2025-10-17 06:57:30.454Z　**标签：**NJU

**原文：**[https://almond-oxygen-ceb.notion.site/24Fall-NJUSE-LLM4SE-28f8b1cc19aa80b194eac9735699de9a?pvs=25](https://almond-oxygen-ceb.notion.site/24Fall-NJUSE-LLM4SE-28f8b1cc19aa80b194eac9735699de9a?pvs=25)

---

> 仅供参考。完整代码和文件：[https://github.com/IsilAlphare/NJUSE_24Fall_LLM4SE](https://github.com/IsilAlphare/NJUSE_24Fall_LLM4SE)

## **RAG实验(必做)**

### **题目要求**

#### **基础要求**

- 构建一个针对arXiv的知识问答系统
- 要求如下
- 给定一个入口，用户可以输入提问
- 不要求要求构建GUI界面
- 用户通过对话进行交互
- 系统寻找与问题相关的论文abstract
- 使用用户的请求对向量数据库进行请求
- 寻找与问题最为相关的abstract
- 系统根据问题和论文abstract回答用户问题，并给出解答问题的信息来源
- 示例

#### **进阶要求**

- 提示优化
- 用户给出的问题或陈述不一定能够匹配向量数据库的查询
- 使用大模型对用户的输入进行润色，提高找到对应文档的概率
- 思路提示(解决思路不唯一，提示仅作为可能的思路示例)
- 观察不同输入后向量数据库找到对应文档的概率
- 总结适用于查询的语句
- 构建提示(prompt)实现对用户输入的润色
- 查询迭代
- 单次的查询可能无法寻找到用户所期望的答案
- 需要通过多轮的搜索和尝试才能获得较为准确的答案
- 思路提示
- 如何将用户的需求拆解，变成可以拆解的逻辑步骤
- 如何判断已经获得准确的答案并停止迭代
- 如何再思路偏移后进行修正

### **资源简介**

向量数据库可按需自行部署，大模型可选择自有api，下列内容为能完成任务的所需资源。

arxiv数据集可以从这里获取 [https://www.kaggle.com/datasets/Cornell-University/arxiv](https://www.kaggle.com/datasets/Cornell-University/arxiv)

#### **大模型(Qwen2.5-14B)**

```
# Qwen2.5-14B模型已接入LangChain Openai API,调用示例如下
from langchain.llmsimport OpenAI, OpenAIChat
import os
os.environ["OPENAI_API_KEY"] ="None"
os.environ["OPENAI_API_BASE"] ="http://10.58.0.2:8000/v1"
llm_completion = OpenAI(model_name="Qwen2.5-14B")
llm_chat = OpenAIChat(model_name="Qwen2.5-14B")
```

---

openai包使用特定版本，避免与langchain不兼容 pip installopenai==0.28

#### **嵌入模型(sentence-transformers/all-MiniLM-L12-v2)**

- 嵌入模型使用huggingface中的all-MiniLM-L12-v2模型

```
from langchain.embeddingsimport HuggingFaceEmbeddings
embedding = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L12-v2")
```

---

当前由于huggingface被墙，无梯子可以使用镜像，详见 [https://hf-mirror.com/](https://hf-mirror.com/)

#### **向量数据库**

arXiv数据存在Milvus中

```
from langchain.vectorstoresimport Milvus
db = Milvus(embedding_function=embedding, collection_name="arXiv",connection_args={"host":"10.58.0.2","port":"19530"})
```

---

由于向量数据库与SDK存在强绑定关系，安装milvus包时请检查版本： pipinstall pymilvus==2.2.6

#### **数据项解释**

- vector： 论文abstract的向量化表示
- access_id：论文的唯一id
- [https://arxiv.org/abs/](https://arxiv.org/abs/)[{access_id}](https://arxiv.org/abs/{access_id}) 论文的详情页
- [https://arxiv.org/pdf/](https://arxiv.org/pdf/)[{access_id}](https://arxiv.org/pdf/{access_id}) 论文的pdf地址
- authors：论文的作者
- title：论文的题目
- comments：论文的评论，一般为作者的补充信息
- journal_ref：论文的发布信息
- doi：电子发行doi
- text：论文的abstract (为了兼容langchain必须命名为text)
- categories：论文的分类

#### **LangChain**

- langchain官方文档 [https://python.langchain.com/](https://python.langchain.com/)
- langchain官方课程 [https://learn.deeplearning.ai/langchain](https://learn.deeplearning.ai/langchain)

### **提交内容**

1. 代码实现
2. 预置题目
3. 预置由json文件构成，包含10个问题(question项目)
4. 使用算法回答其中问题，答案存在answer项内
5. 该文件存储为answer.json，单独提交

### **注意事项**

1. Python版本要在3.8和3.11之间。（我使用了3.9.2rc1）因为要求ymilvus=2.2.6，这个库依赖1.49.1到1.53.0的grpcio，1.53.0的grpcio不支持python3.12。
2. 因为网络原因，运行时无法自动下载sentence-transformers，需要手动下载：[sentence-transformers](https://hf-mirror.com/sentence-transformers/all-MiniLM-L12-v2/tree/main) 整个目录。对于根目录下 `pytorch_model.bin` 和 `model.safetensors` 两个文件，需要手动下载。

注：

**sentence-transformers**是一个基于Python的库，它专门用于句子、文本和图像的嵌入。这个库可以计算100多种语言的文本嵌入，并且这些嵌入可以轻松地用于语义文本相似性、语义搜索和同义词挖掘等任务。sentence-transformers基于PyTorch和Transformers库构建，提供了大量针对各种自然语言处理任务的预训练模型。此外，用户还可以根据自己的需求对模型进行微调。

a. 在项目根目录下git clone sentence-transformers目录

```
git clone https://hf-mirror.com/sentence-transformers/all-MiniLM-L12-v
```

---

b再手动下载将网站中`pytorch_model.bin` 和 `model.safetensors`，将两个文件放入all-MiniLM-L12-v文件夹中。

1. 安装正确版本的依赖：

用管理员模式进行安装：

```
pip install openai==0.28
pip install pymilvus==2.2.6
```

---

其他依赖直接安装最新版即可。(pip install + 需要的包如langchain/langchain_openai)

1. 如遇已安装pymilvus却无法import的报错，有可能是没有google模块

```
pip install --upgrade google-api-python-client
```

---

1. 记得在校园网环境下运行，否则milvus会超时
2. 终端运行结果示例：

```
c:\Users\xiaoyu\Desktop\RAG-arVix\main.py:22: LangChainDeprecationWarning: The class `Milvus` was deprecatedin LangChain 0.2.0 and will be removedin 1.0. An updated version of the class existsin the :class:`~langchain-milvus package and should be used instead. To use it run `pip install -U :class:`~langchain-milvus` and import as `from :class:`~langchain_milvus import MilvusVectorStore``.
  db = Milvus(embedding_function=embedding, collection_name="arXiv_Back",
2024-12-27 22:32:33,121 - INFO - Answering question: 什么是大语言模型？
2024-12-27 22:32:41,158 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:32:44,626 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:32:44,631 - INFO - Answering question: 形式化软件工程是什么？
2024-12-27 22:32:52,830 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:32:56,517 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:32:56,519 - INFO - Answering question: 大语言模型的缩放定理是什么？
2024-12-27 22:33:04,939 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:33:11,058 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:33:11,060 - INFO - Answering question: 代码评审的目标是什么？
2024-12-27 22:33:15,563 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:33:18,328 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:33:18,330 - INFO - Answering question: 重复的数据会对In-content Learning产生什么影响？
2024-12-27 22:33:26,725 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:33:31,333 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:33:31,337 - INFO - Answering question: 软件工程领域如何适应不同领域？
2024-12-27 22:33:38,194 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:33:46,489 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:33:46,492 - INFO - Answering question: 区块链如何保证安全？
2024-12-27 22:33:55,499 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:34:01,950 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"
2024-12-27 22:34:01,953 - INFO - Answering question: 指令微调的目标是什么？
2024-12-27 22:34:09,939 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"2024-12-27 22:34:14,604 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"2024-12-27 22:34:14,607 - INFO - Answering question: 离子阱计算机的原理是什么？
2024-12-27 22:34:18,538 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"2024-12-27 22:34:21,816 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"2024-12-27 22:34:21,818 - INFO - Answering question: 人造原子是什么？
2024-12-27 22:34:29,293 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"2024-12-27 22:34:33,883 - INFO - HTTP Request: POST http://10.58.0.2:8000/v1/chat/completions"HTTP/1.1 200 OK"2024-12-27 22:34:33,887 - INFO - Answers successfully written to answers.json.
```

---

## **Agent实验**

### **题目要求**

实现一个只需要使用语言即可使用的选课系统，不包含任何GUI。被调用的函数可以使用copilot生成，不需要使用数据库，只需要能够模拟对应功能。

### **功能简介**

查询：带有筛选的查询，可以筛选必修或选修。

选课：选择需要的课程，智能返回结果

成功返回选课结果

未成功返回错误

删除：删除选择的课程，智能返回结果

### **进阶要求**

查询增强，根据描述返回用户最为感兴趣的课程

例如：用户喜欢体育，羽毛球等放在前面

选择增强：当用户在选课和删除时提供的课程不准确时，智能提供可能用户想提的课程

### **实验资源**

1.python库：[https://github.com/QwenLM/Qwen-Agent](https://github.com/QwenLM/Qwen-Agent)

2.调用模型的设置可以参考如下：

```
'model':'Qwen2.5-14B',

'model_server':'http://10.58.0.2:8000/v1', ;

'api_key':'None',
```

---

### **提交方法**

将所有代码(不包含库文件)实现打包压缩上传。

### **运行结果**

```
Type"clear" to clear the content, and"exit" to close this session.
AI智能选课助手: 你好！我是一个AI智能选课助手，可以帮助你完成以下操作：

1. 查询课程：根据你的需求（如必修或选修），查询当前选课系统的课程列表。
2. 选课：根据课程ID选择课程，告诉你选课结果。
3. 退课：根据课程ID删除已选课程，显示退课结果。
4. 查看课表：查看你当前选的所有课程，或者推荐可能感兴趣的课程。

如果你需要查询课程、选课、退课或查看课表，请告诉我你的具体需求，我会帮你操作。
(user) > 有哪些课是必修课？
SYSTEM: 正在调用 Agent `ai_course_query_courses`，参数: {"category":"必修"}
ai_course_query_courses: {courses: [{课程ID: 100001, 课程名称:"马克思主义", 课程类别:"必修"}, {课程ID: 100002, 课程名称:"工程伦理", 课程类别:"必修"}, {课程ID: 120001, 课程名称:"操作系统", 课程类别:"必修"}, {课程ID: 150001, 课程名称:"离散数学", 课程类别:"必修"}, {课程ID: 150002, 课程名称:"学术英语与科技写作", 课程类别:"必修"}, {课程ID: 150003, 课程名称:"软件工程理论基础", 课程类别:"必修"}, {课程ID: 150004, 课程名称:"软件工程与计算Ⅲ", 课程类别:"必修"}, {课程ID: 150005, 课程名称:"软件体系架构", 课程类别:"必修"}]}
AI智能选课助手: 当前可选的必修课程有以下几门：

1. 马克思主义 (课程ID: 100001)
2. 工程伦理 (课程ID: 100002)
3. 操作系统 (课程ID: 120001)
4. 离散数学 (课程ID: 150001)
5. 学术英语与科技写作 (课程ID: 150002)
6. 软件工程理论基础 (课程ID: 150003)
7. 软件工程与计算Ⅲ (课程ID: 150004)
8. 软件体系架构 (课程ID: 150005)

您需要选择哪一门呢？或者，您有兴趣了解哪一门课程的更多信息吗？
(user) > 必修课都帮我选上吧
SYSTEM: 正在调用 Agent `ai_course_query_selected_courses`，参数: {}
ai_course_query_selected_courses: {courses: []}
SYSTEM: 正在调用 Agent `ai_course_query_courses`，参数: {"category":"必修"}
ai_course_query_courses: {courses: [{课程ID: 100001, 课程名称:"马克思主义", 课程类别:"必修"}, {课程ID: 100002, 课程名称:"工程伦理", 课程类别:"必修"}, {课程ID: 120001, 课程名称:"操作系统", 课程类别:"必修"}, {课程ID: 150001, 课程名称:"离散数学", 课程类别:"必修"}, {课程ID: 150002, 课程名称:"学术英语与科技写作", 课程类别:"必修"}, {课程ID: 150003, 课程名称:"软件工程理论基础", 课程类别:"必修"}, {课程ID: 150004, 课程名称:"软件工程与计算Ⅲ", 课程类别:"必修"}, {课程ID: 150005, 课程名称:"软件体系架构", 课程类别:"必修"}]}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 100001}
ai_course_select_course: {result:"选课成功: 马克思主义"}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 100002}
ai_course_select_course: {result:"选课成功: 工程伦理"}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 120001}
ai_course_select_course: {result:"选课成功: 操作系统"}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 150001}
ai_course_select_course: {result:"选课成功: 离散数学"}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 150002}
ai_course_select_course: {result:"选课成功: 学术英语与科技写作"}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 150003}
ai_course_select_course: {result:"选课成功: 软件工程理论基础"}
ai_course_select_course: {result:"选课成功: 软件工程理论基础"}
SYSTEM: 操作完成。
(user) > 有什么体育课？我比较喜欢球类运动
SYSTEM: 正在调用 Agent `ai_course_query_courses`，参数: {"category":"选修"}
ai_course_query_courses: {courses: [{课程ID: 100091, 课程名称:"新时代中国特色社会主义理论实践", 课程类别:"选修"}, {课程ID: 100092, 课程名称:"形势与政策", 课程类别:"选修"}, {课程ID: 120002, 课程名称:"计算机图形学", 课程类别:"选修"}, {课程ID: 120003, 课程名称:"形式语言与自动机导论", 课程类别:"选修"}, {课程ID: 120004, 课程名称:"数据库原理与技术", 课程类别:"选修"}, {课程ID: 130001, 课程名称:"面 向对象与Python编程", 课程类别:"选修"}, {课程ID: 130002, 课程名称:"面向对象与C++编程", 课程类别:"选修"}, {课程ID: 130003, 课程名称:"面向对象与Java编程", 课程类别:"选修"}, {课程ID: 130011, 课程名称:"Golang项目实战", 课程类别:"选修"}, {课程ID: 130012, 课程名称:"Rust项目实战", 课程类别:"选修"}, {课程ID: 130013, 课程名称:"ARMv8汇编与C语言实践", 课程类别:"选修"}, {课程ID: 150006, 课程名称:"大数据与人工智能Ⅱ", 课程类别:"选修"}, {课程ID: 150007, 课程名称:"大语言模型辅助软件工程", 课程类别:"选修"}, {课程ID: 150008, 课程名称:"高级算法", 课程类别:"选修"}, {课程ID: 150009, 课程名称:"软件需求工程", 课程类别:"选修"}, {课程ID: 150010, 课程名称:"移动应用开发（鸿 蒙）", 课程类别:"选修"}, {课程ID: 150011, 课程名称:"移动应用开发（iOS）", 课程类别:"选修"}, {课程ID: 150012, 课程名称:"嵌入式应用开发", 课程类别:"选修"}, {课程ID: 150013, 课程名称:"高级人机交互技术", 课程类别:"选修"}, {课程ID: 150014, 课程名称:"软件测试原理与方 法", 课程类别:"选修"}, {课程ID: 150015, 课程名称:"DevOps实践导论", 课程类别:"选修"}, {课程ID: 150016, 课程名称:"Linux系统基础", 课 程类别:"选修"}, {课程ID: 150017, 课程名称:"自然语言处理基础", 课程类别:"选修"}, {课程ID: 900001, 课程名称:"体育（羽毛球）", 课程类 别:"选修"}, {课程ID: 900002, 课程名称:"体育（足球）", 课程类别:"选修"}, {课程ID: 900003, 课程名称:"体育（瑜伽）", 课程类别:"选修"}, {课程ID: 900004, 课程名称:"体育（健美）", 课程类别:"选修"}, {课程ID: 900005, 课程名称:"体育（游泳）", 课程类别:"选修"}, {课程ID: 900006, 课程名称:"体育（台球）", 课程类别:"选修"}]}
AI智能选课助手: 我为您查询了选修课列表，其中包含了几门体育课程，您提到喜欢球类运动，因此我为您挑选了以下几个选项：

1. 体育（羽毛球） (课程ID: 900001)
2. 体育（足球） (课程ID: 900002)

您想选择哪一门呢？如果您需要更多信息或有其他偏好，请告诉我。
(user) > 帮我选羽毛球吧
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 900001}
ai_course_select_course: {result:"选课成功: 体育（羽毛球）"}
AI智能选课助手: 选课成功！您现在已选修了体育（羽毛球）这门课程。如果还有其他课程需要选择或有任何其他问题，请随时告诉我！
(user) > 有什么选修课是适合想学习编程语言的人学习的？
SYSTEM: 正在调用 Agent `ai_course_query_courses`，参数: {"category":"选修"}
ai_course_query_courses: {courses: [{课程ID: 100091, 课程名称:"新时代中国特色社会主义理论实践", 课程类别:"选修"}, {课程ID: 100092, 课程名称:"形势与政策", 课程类别:"选修"}, {课程ID: 120002, 课程名称:"计算机图形学", 课程类别:"选修"}, {课程ID: 120003, 课程名称:"形式语言与自动机导论", 课程类别:"选修"}, {课程ID: 120004, 课程名称:"数据库原理与技术", 课程类别:"选修"}, {课程ID: 130001, 课程名称:"面 向对象与Python编程", 课程类别:"选修"}, {课程ID: 130002, 课程名称:"面向对象与C++编程", 课程类别:"选修"}, {课程ID: 130003, 课程名称:"面向对象与Java编程", 课程类别:"选修"}, {课程ID: 130011, 课程名称:"Golang项目实战", 课程类别:"选修"}, {课程ID: 130012, 课程名称:"Rust项目实战", 课程类别:"选修"}, {课程ID: 130013, 课程名称:"ARMv8汇编与C语言实践", 课程类别:"选修"}, {课程ID: 150006, 课程名称:"大数据与人工智能Ⅱ", 课程类别:"选修"}, {课程ID: 150007, 课程名称:"大语言模型辅助软件工程", 课程类别:"选修"}, {课程ID: 150008, 课程名称:"高级算法", 课程类别:"选修"}, {课程ID: 150009, 课程名称:"软件需求工程", 课程类别:"选修"}, {课程ID: 150010, 课程名称:"移动应用开发（鸿 蒙）", 课程类别:"选修"}, {课程ID: 150011, 课程名称:"移动应用开发（iOS）", 课程类别:"选修"}, {课程ID: 150012, 课程名称:"嵌入式应用开发", 课程类别:"选修"}, {课程ID: 150013, 课程名称:"高级人机交互技术", 课程类别:"选修"}, {课程ID: 150014, 课程名称:"软件测试原理与方 法", 课程类别:"选修"}, {课程ID: 150015, 课程名称:"DevOps实践导论", 课程类别:"选修"}, {课程ID: 150016, 课程名称:"Linux系统基础", 课 程类别:"选修"}, {课程ID: 150017, 课程名称:"自然语言处理基础", 课程类别:"选修"}, {课程ID: 900001, 课程名称:"体育（羽毛球）", 课程类 别:"选修"}, {课程ID: 900002, 课程名称:"体育（足球）", 课程类别:"选修"}, {课程ID: 900003, 课程名称:"体育（瑜伽）", 课程类别:"选修"}, {课程ID: 900004, 课程名称:"体育（健美）", 课程类别:"选修"}, {课程ID: 900005, 课程名称:"体育（游泳）", 课程类别:"选修"}, {课程ID: 900006, 课程名称:"体育（台球）", 课程类别:"选修"}]}
AI智能选课助手: 我为您查询了当前可选的编程相关选修课程，以下是几门适合学习编程语言的课程：

1. 面向对象与Python编程 (课程ID: 130001)
2. 面向对象与C++编程 (课程ID: 130002)
3. 面向对象与Java编程 (课程ID: 130003)
4. Golang项目实战 (课程ID: 130011)
5. Rust项目实战 (课程ID: 130012)
6. ARMv8汇编与C语言实践 (课程ID: 130013)

这些课程涵盖了不同的编程语言和编程实践，您可以根据自己的兴趣和需求来选择一门。请问您是否有特别偏好的编程语言，或者您想了解更多哪一门课 程的信息呢？
(user) > 如果我想做前端后端开发，这些编程语言中是哪些推荐我学的？
AI智能选课助手: 对于前端和后端开发，这里有一些建议的编程语言和对应的课程供您参考：

**前端开发**：

- JavaScript：这是前端开发中最为主要的编程语言，几乎所有的前端框架和库都是基于JavaScript开发的。不过，您在提供的课程列表中没有直接看到JavaScript相关的课程，但是掌握一门基于JavaScript的前端框架是非常重要的，例如React、Vue等。
- 如果您对JavaScript及其框架感兴趣，建议您关注课程以外的在线资源和文档，同时可以参加一些编程社区和项目来提升您的前端技能。

**后端开发**：

- Python：Python是一种广泛用于后端开发的语言，尤其是对于初学者友好。您可以在提供的课程中选择"面向对象与Python编程" (课程ID: 130001) 来 学习Python。
- Java：Java也是一种非常流行的后端编程语言，特别是在企业级应用中。您可以在提供的课程中选择"面向对象与Java编程" (课程ID: 130003) 来学习Java。
- C++：虽然C++通常用于系统编程和游戏开发，但也可以用于后端开发，尤其是在需要高性能的场景中。您可以在提供的课程中选择"面向对象与C++编程" (课程ID: 130002) 来学习C++。
- Golang：Go语言是近年来兴起的一种高效、简洁的语言，特别适合用于开发后台服务。您可以在提供的课程中选择"Golang项目实战" (课程ID: 130011) 来学习Go语言。

基于您的需求，我建议您选择"面向对象与Python编程" 或"面向对象与Java编程" 作为您学习后端开发的起点。Python和Java都是广泛使用的后端编程语言，适合初学者快速上手。您可以通过选修这些课程来获得必要的基础，并通过实践项目来提升您的技能。

如果您想了解更多关于这些课程的信息，或者需要帮助选修其中的一门课程，请告诉我。
(user) > 那这几门都选上吧
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 130001}
ai_course_select_course: {result:"选课成功: 面向对象与Python编程"}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 130003}
ai_course_select_course: {result:"选课成功: 面向对象与Java编程"}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 130002}
ai_course_select_course: {result:"选课成功: 面向对象与C++编程"}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 130011}
ai_course_select_course: {result:"选课成功: Golang项目实战"}
AI智能选课助手: 您希望选修的四门课程都已经成功选上了：

1. 面向对象与Python编程 (课程ID: 130001)
2. 面向对象与Java编程 (课程ID: 130003)
3. 面向对象与C++编程 (课程ID: 130002)
4. Golang项目实战 (课程ID: 130011)

现在，您已经选修了与前端和后端开发相关的编程语言课程。如果您还有其他课程需求或任何其他问题，请随时告诉我！
(user) > c++和java优点重叠了，我不想选c++了，帮我退掉这门课吧
SYSTEM: 正在调用 Agent `ai_course_delete_course`，参数: {"course_id": 130002}
ai_course_delete_course: {result:"删除成功: 面向对象与C++编程"}
AI智能选课助手: 您选择的面向对象与C++编程课程已经成功删除。现在您选修的课程包括：

1. 面向对象与Python编程 (课程ID: 130001)
2. 面向对象与Java编程 (课程ID: 130003)
3. Golang项目实战 (课程ID: 130011)

如果您还有其他需求或问题，请随时告诉我！
(user) > 有什么选修课是关于网络的？我对此有些兴趣
SYSTEM: 正在调用 Agent `ai_course_query_courses`，参数: {"category":"选修"}
ai_course_query_courses: {courses: [{课程ID: 100091, 课程名称:"新时代中国特色社会主义理论实践", 课程类别:"选修"}, {课程ID: 100092, 课程名称:"形势与政策", 课程类别:"选修"}, {课程ID: 120002, 课程名称:"计算机图形学", 课程类别:"选修"}, {课程ID: 120003, 课程名称:"形式语言与自动机导论", 课程类别:"选修"}, {课程ID: 120004, 课程名称:"数据库原理与技术", 课程类别:"选修"}, {课程ID: 130001, 课程名称:"面 向对象与Python编程", 课程类别:"选修"}, {课程ID: 130002, 课程名称:"面向对象与C++编程", 课程类别:"选修"}, {课程ID: 130003, 课程名称:"面向对象与Java编程", 课程类别:"选修"}, {课程ID: 130011, 课程名称:"Golang项目实战", 课程类别:"选修"}, {课程ID: 130012, 课程名称:"Rust项目实战", 课程类别:"选修"}, {课程ID: 130013, 课程名称:"ARMv8汇编与C语言实践", 课程类别:"选修"}, {课程ID: 150006, 课程名称:"大数据与人工智能Ⅱ", 课程类别:"选修"}, {课程ID: 150007, 课程名称:"大语言模型辅助软件工程", 课程类别:"选修"}, {课程ID: 150008, 课程名称:"高级算法", 课程类别:"选修"}, {课程ID: 150009, 课程名称:"软件需求工程", 课程类别:"选修"}, {课程ID: 150010, 课程名称:"移动应用开发（鸿 蒙）", 课程类别:"选修"}, {课程ID: 150011, 课程名称:"移动应用开发（iOS）", 课程类别:"选修"}, {课程ID: 150012, 课程名称:"嵌入式应用开发", 课程类别:"选修"}, {课程ID: 150013, 课程名称:"高级人机交互技术", 课程类别:"选修"}, {课程ID: 150014, 课程名称:"软件测试原理与方 法", 课程类别:"选修"}, {课程ID: 150015, 课程名称:"DevOps实践导论", 课程类别:"选修"}, {课程ID: 150016, 课程名称:"Linux系统基础", 课 程类别:"选修"}, {课程ID: 150017, 课程名称:"自然语言处理基础", 课程类别:"选修"}, {课程ID: 900001, 课程名称:"体育（羽毛球）", 课程类 别:"选修"}, {课程ID: 900002, 课程名称:"体育（足球）", 课程类别:"选修"}, {课程ID: 900003, 课程名称:"体育（瑜伽）", 课程类别:"选修"}, {课程ID: 900004, 课程名称:"体育（健美）", 课程类别:"选修"}, {课程ID: 900005, 课程名称:"体育（游泳）", 课程类别:"选修"}, {课程ID: 900006, 课程名称:"体育（台球）", 课程类别:"选修"}]}
AI智能选课助手: 在当前的选修课程列表中，直接以“网络”为主题的课程没有直接列出，不过有几门课程可能对您理解网络和网络技术会有帮助：

1. **DevOps实践导论 (课程ID: 150015)**：这门课程可能会涉及到网络配置和管理的内容，特别是网络环境下的持续集成和部署。
2. **Linux系统基础 (课程ID: 150016)**：这门课程中会涉及网络配置和网络服务的基础知识。
3. **移动应用开发（鸿蒙） (课程ID: 150010)** 和 **移动应用开发（iOS） (课程ID: 150011)**：这两门课程中可能会包括对移动网络协议和网络架 构的理解。

如果您想要更专注于网络的课程，可能需要寻找更多的资源或稍后查看是否有网络相关的课程补充进来。

不过，如果您还是希望从以上这些课程中选择一门，我建议您选择 **DevOps实践导论** (课程ID: 150015)，因为它可能更适合直接与网络技术相关联， 特别是如果您对如何在实际网络环境中部署和管理服务感兴趣的话。

是否想继续选择 **DevOps实践导论** 这门课程，或者您有其他的偏好吗？请告诉我您的选择。
(user) > 帮我选上Linux和鸿蒙这两门课吧
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 150016}
ai_course_select_course: {result:"选课成功: Linux系统基础"}
SYSTEM: 正在调用 Agent `ai_course_select_course`，参数: {"course_id": 150010}
ai_course_select_course: {result:"选课成功: 移动应用开发（鸿蒙）"}
AI智能选课助手: 您选择的两门课程——Linux系统基础 (课程ID: 150016) 和移动应用开发（鸿蒙） (课程ID: 150010) ——都已经成功选上了。

现在您选修的课程包括：

1. 面向对象与Python编程 (课程ID: 130001)
2. 面向对象与Java编程 (课程ID: 130003)
3. Golang项目实战 (课程ID: 130011)
4. Linux系统基础 (课程ID: 150016)
5. 移动应用开发（鸿蒙） (课程ID: 150010)

如果您还有其他需求或问题，请随时告诉我！
(user) > 我现在一共要上哪些课？
SYSTEM: 正在调用 Agent `ai_course_query_selected_courses`，参数: {}
ai_course_query_selected_courses: {courses: [{课程ID: 100001, 课程名称:"马克思主义", 课程类别:"必修"}, {课程ID: 100002, 课程名称:"工程伦理", 课程类别:"必修"}, {课程ID: 120001, 课程名称:"操作系统", 课程类别:"必修"}, {课程ID: 150001, 课程名称:"离散数学", 课程类别:"必修"}, {课程ID: 150002, 课程名称:"学术英语与科技写作", 课程类别:"必修"}, {课程ID: 150003, 课程名称:"软件工程理论基础", 课程类别:"必修"}, {课程ID: 900001, 课程名称:"体育（羽毛球）", 课程类别:"选修"}, {课程ID: 130001, 课程名称:"面向对象与Python编程", 课程类别:" 选修"}, {课程ID: 130003, 课程名称:"面向对象与Java编程", 课程类别:"选修"}, {课程ID: 130011, 课程名称:"Golang项目实战", 课程类别:"选 修"}, {课程ID: 150016, 课程名称:"Linux系统基础", 课程类别:"选修"}, {课程ID: 150010, 课程名称:"移动应用开发（鸿蒙）", 课程类别:"选修"}]}
AI智能选课助手: 您当前选修的课程包括以下这些：

**必修课程：**

1. 马克思主义 (课程ID: 100001)
2. 工程伦理 (课程ID: 100002)
3. 操作系统 (课程ID: 120001)
4. 离散数学 (课程ID: 150001)
5. 学术英语与科技写作 (课程ID: 150002)
6. 软件工程理论基础 (课程ID: 150003)

**选修课程：**

1. 体育（羽毛球） (课程ID: 900001)
2. 面向对象与Python编程 (课程ID: 130001)
3. 面向对象与Java编程 (课程ID: 130003)
4. Golang项目实战 (课程ID: 130011)
5. Linux系统基础 (课程ID: 150016)
6. 移动应用开发（鸿蒙） (课程ID: 150010)

如果您还有其他需求或问题，请随时告诉我！
```

---

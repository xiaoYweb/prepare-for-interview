/**
 * Git —>
第一次配置Git 全局配置个人信息
git config --global user.name "严彬彬"
git config --global user.email "yanbinbin@xinc818.group"

克隆这个存储库
git clone http://yanbinbin@bitbucket.xinc818.com/scm/web-front-end/test.git

的代码已经准备好推送
如果你代码已经准备好推送到仓库，请在终端中执行该命令
cd existing-project
git init
git add --all
git commit -m "Initial Commit"
git remote add origin http://yanbinbin@bitbucket.xinc818.com/scm/web-front-end/test.git
git push -u origin master

我的代码已经由Git跟踪
如果你的代码已经由Git跟踪，然后设置这个仓库作为你的“origin”推送
cd existing-project
git remote set-url origin http://yanbinbin@bitbucket.xinc818.com/scm/web-front-end/test.git
git push -u origin --all
git push origin --tags

本地分支推送远程
git push --set-upstream origin 分支名 ?


git pull origin online:online

拉取全程 online 分支 merge 本地 online分支
:online 不写 则与当前分支merge
git pull === git fetch + git merge

git fetch origin online
git checkout online
git merge origin/online

注意点 本地使用checkout -b online 是创建的新onlne分支，而与服务器online根本不算是同一个分支，所以要从服务端拉取，切记

注意场景
远程仓库里有个分支dev2,我本地没有该分支，我要把dev2拉到我本地
如果是 git checkout -b dev2 && git pull origin dev2 这样是先以当前分支为父分支 新开分支 dev2  
正确操作  git checkout -b dev2 origin/dev2
(若不成功 本地查找不到 origin/dev2 远程是有的 git fetch 获取更新后 在 执行上面 git checkout -b dev2 origin/dev2)
或者 直接 使用 git pull origin dev2:dev2

git push origin master 
git tag 0.0.1
git push origin 0.0.1
git tag -l 查看 tag列表

my -> dev -> daily 
dev -> gray
gray  -> master


git reflog
git reset —head xxx

git remote -v
git remote set-url origin https://github.com/xxx/xxx.git  切换远程仓库地址
git push —all  推送所有本地分支

 */
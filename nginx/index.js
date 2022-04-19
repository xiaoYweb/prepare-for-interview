/**
 * 
 */


// Nginx

// 多进程(单线程/进程) 多路io复用 

// 多个文件描述符的



// 进程间切换

// 文件描述符 表述指向文件的引用的抽象化概念

// i/o模式 
// 举 一次io访问(read) 数据会先被拷贝到操作系统内核的缓冲区域 然后才会从操作系统内核缓冲区域拷贝到应用程序的缓冲区 最后交给进程
// （经历了2个阶段 1. 等待数据准备 2. 将数据从内核拷贝到进程中）
// Nginx采用了 异步阻塞io 


// 内核空间  用户空间   顾客 服务员 厨师
// 同步异步       内核空间  <-> 用户空间                         
// 阻塞非阻塞  内核空间  <-> 具体操作者worker

// 多路io复用  
// 多个文件描述符的io操作都在一个线程里并发交替完成
// 多个顾客给 一个 服务员下单 服务员 个多个 厨师下单  


// 安装 Nginx 步骤
// 1. 关闭防火墙 （临时） systemctl stop firewalld.service  
// 2. 停用 selinux（临时） 修改配置文件 /etc/selinux/config  SELINUX=disabled (enforcing)
// 3. 安装依赖包 yum -y install gcc gcc-c++ autoconf pcre pcre-devel make automake
// 4.  yum -y install wget httpd-tools vim
// 5.  客户端安装 地址  https://nginx.org/en/download.html 
// 6. 服务器安装 地址 http://nginx.org/en/linux_packages.html 先创建文件 /etc/yum.repos.d/nginx.repo 写入安装源 
// [nginx-stable]
// name=nginx stable repo
// baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
// gpgcheck=1
// enabled=1
// gpgkey=https://nginx.org/keys/nginx_signing.key
// module_hotfixes=true

// [nginx-mainline]
// name=nginx mainline repo
// baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
// gpgcheck=1
// enabled=0
// gpgkey=https://nginx.org/keys/nginx_signing.key
// module_hotfixes=true

// 7. 查看是否可以安装  yum list | grep nginx  可以的话 会有一大列表内容 
// 8.  yum install nginx -y
// 9. nginx -v 查看版本号 有内容 即 已安装
// 10. 查看nginx 安装的配置文件及目录  rpm -ql nginx
// 11. 日志切割文件 /etc/logrotate.d/nginx/ 对访问日志进行切割  文件日志 在 /var/log/nginx/
// 12. 主配置文件 /etc/nginx/nginx.conf
// 13. 】



// whereis nginx 可以查找是否按照了 nginx




// yarn dev &  可以继续操作其他
// 1. jobs 罗列后台运行的回话列表 (仅在当前回话没有关闭的情况 若新的回话不会返回) fg %n  (n>1) 进入后台第几个回话 
// 2. ps aux | grep ‘服务名’  kill -9 pid 杀死进程
// 3. netstat -tulnp | grep 端口号  kill -9 pid 杀死进程
 
 
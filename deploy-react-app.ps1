$localPath = "E:\sti\hmc2\hotel_contract_management_ui"
$tarFileName = "react-app.tar.gz"
$remoteUser = "ubuntu"
$remoteHost = "52.29.74.129"
$remotePath = "~/hmc2"


# 将本地路径转换为 WSL 路径
$wslLocalPath = wsl wslpath -w $localPath

# 进入 WSL 环境并创建 tar 文件，排除 node_modules
wsl bash -c "cd $wslLocalPath && tar --exclude='node_modules' -cvzf /mnt/c/$tarFileName ."

# 使用 scp 将 tar 文件复制到远程服务器
scp "C:\${tarFileName}" ${remoteUser}@${remoteHost}:~

# 在远程服务器上解压 tar 文件并移动到目标目录
ssh ${remoteUser}@${remoteHost} "mkdir -p ${remotePath} && tar -xvzf ${tarFileName} -C ${remotePath} && rm ${tarFileName}"

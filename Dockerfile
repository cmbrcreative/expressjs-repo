FROM centos:7

ENV SOURCE_DIRECTORY /root/project
COPY . $SOURCE_DIRECTORY
WORKDIR $SOURCE_DIRECTORY

RUN \
    yum -y update && \
    yum install -y nginx-1.16.0 curl && \
    curl --silent --location https://rpm.nodesource.com/setup_15.x | bash - && \
    curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo && \
    rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg && \
    yum -y install nodejs yarn git
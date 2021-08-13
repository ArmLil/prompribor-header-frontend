#!/bin/bash

CURRENT_PATH=`pwd`

PACKAGE_NAME=sysmon-frontend
PACKAGE_PATH=${CURRENT_PATH}/tmp/${PACKAGE_NAME}
FRONTEND_PATH=${PACKAGE_PATH}/var/www/sysmon/frontend
DIST_PATH=${CURRENT_PATH}/build

npm install
npm run build

mkdir -p ${PACKAGE_PATH}
cp -a ${CURRENT_PATH}/DEB/* ${PACKAGE_PATH}
chmod 755 ${PACKAGE_PATH}/DEBIAN
chmod 755 ${PACKAGE_PATH}/etc
chmod 755 ${PACKAGE_PATH}/var
chmod 755 ${PACKAGE_PATH}/DEBIAN/control
chmod 755 ${PACKAGE_PATH}/DEBIAN/postinst
chmod 755 ${PACKAGE_PATH}/DEBIAN/postinstall
chmod 755 ${PACKAGE_PATH}/DEBIAN/postrm

cp -a ${DIST_PATH}/* ${FRONTEND_PATH}

cd ${CURRENT_PATH}/tmp/
dpkg-deb --build ${PACKAGE_NAME}

VERSION_DEBFILE=$(awk '/^Version:/ { print $2 }' ./${PACKAGE_NAME}/DEBIAN/control)
mv ${PACKAGE_NAME}.deb ${CURRENT_PATH}/${PACKAGE_NAME}-${VERSION_DEBFILE}.deb

rm -rf  ${CURRENT_PATH}/tmp/

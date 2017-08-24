# Secretimg
Secrets in the picture

## Introduction
```
You can hide the information in the picture, through the picture as a carrier encrypted transmission.
```
## Install
```
npm install
npm link
```

## Use
```shell
Secretimg create
          --in=/img.jpg
          --out=/manipulatedimg.jpg
          --msg="encryptionMessage"
          --key="encryptionKey"
```

Read a message from a jpg

```shell
Secretimg read
          --in=path/img.jpg
          --key="encryptionKey"
```

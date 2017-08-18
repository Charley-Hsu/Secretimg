# Secretimg
Secrets in the picture
npm install
npm link

## Usage
Embed a message into a jpg

```shell
Secretimg create
    --in=path/to/img.jpg
    --out=path/to/manipulatedimg.jpg
    --msg="message you want to embed"
    --key="encryptionpassword"
```

Read a message from a jpg

```shell
Secretimg read
    --in=path/to/img.jpg
    --key="encryptionpassword"
```

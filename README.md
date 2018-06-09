# Google Cloud Datastore Tools

[![Greenkeeper badge](https://badges.greenkeeper.io/boiyaa/datastore-tools.svg)](https://greenkeeper.io/)

[Cloud Datastore](https://cloud.google.com/datastore/docs) is a NoSQL document database built for automatic scaling, high performance, and ease of application development. While the Cloud Datastore interface has many of the same features as traditional databases, as a NoSQL database it differs from them in the way it describes relationships between data objects.

**Table of contents:**

* [Before you begin](#before-you-begin)
* [Installing the tools](#installing-the-tools)
* [Using the tools](#using-the-tools)

## Before you begin

[Set up authentication with a service account][auth] so you can access the API from your local workstation.

[auth]: https://cloud.google.com/docs/authentication/getting-started

## Installing the tools

`npm install -g datastore-tools`

## Using the tools

Usage: `datastore --help` or `datastore-tools --help`

```
datastore <command>

Commands:
  datastore truncate     Delete all entities.
  datastore dump <file>  Export all entities.

Options:
  --version        Show version number                                 [boolean]
  --namespace, -n  Specify namespace                                    [string]
  --kind, -k       Specify kind                                         [string]
  --verbose, -v    Provide more information                            [boolean]
  --help           Show help                                           [boolean]

Examples:
  datastore truncate        Delete all entities.
  datastore dump dump.json  Export all entities to dump.json.
```

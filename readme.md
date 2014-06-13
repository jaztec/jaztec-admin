JaztecAdmin
===========
[![Build Status](https://travis-ci.org/jaztec/jaztec-admin.svg?branch=master)](https://travis-ci.org/jaztec/jaztec-admin)

Admin module integrating the rovak/kj-sencha module into a highly configurable
front-end system. ZF-2 modules can be easily programmed to provide an user 
interface through the ExtJS library's.

This repository is a work in progress. Currently no extensive unit testing or error handling
is done. Please use with care.

```sh
./composer.phar require jaztec/jaztec-admin
```

or include it in the composer.json of your project with

```sh
{
    "require": {
        "jaztec/jaztec-base": "0.1.*",
        "jaztec/jaztec-acl": "0.1.*",
        "jaztec/jaztec-admin": "0.1.*"
    }
}

```

## Dependencies

- rwoverdijk/assetmanager
- rovak/kj-sencha
- jaztec/jaztec-base
- jaztec/jaztec-acl

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "PyPa" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        'extension.createPyPa', 
        function () {
            const folderPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
            
            // Setup file
            const setupContent = `from setuptools import setup, find_packages
from os import path
from io import open

# setup file path
here = path.abspath(path.dirname(__file__))
reqs = []

# reading README.md, change if needed
with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()
# if no README.md exist then un-comment the below line
# long_description = '''<add-your-description-here>'''

# reading pre-requisits if any else comment the block
with open(path.join(here, 'requirements.txt'), encoding='utf-8')as f:
    read_lines = f.readlines()
    reqs = [ each.strip() for each in read_lines]

setup(
    name='<package-name>',
    version='<package-version>',
    description="<pakage-description>",
    long_description = long_description,
    long_description_content_type = 'text/markdown',
    url = '<package-url or github-url>',
    author = '<author-name>',
    author_email='<author-email>',
    
    # Un-comment to enable command line feature
    # entry_points={
    # 	'console_scripts': [
    # 		'<cli-command> = <package-name>.<python-script-name>:<function-name>'
    # 	],
    # },

    install_requires=reqs,
    classifiers = [ 
        # Choose the classifiers at https://pypi.org/classifiers/

        # Python Package Development Status. 
        'Development Status :: <development-status>',
        # Most common <development-status> are: 
        # 3 - Alpha
        # 4 - Beta
        # 5 - Production/Stable

        'Intended Audience :: <audience>',
        # Most common <audience> are:
        # Developers
        # Education
        # Manufacturing
        # Science/Research

        'Topic :: <package-for> :: <package-useage-at>',
        # In general <package-for> "Software Development" and <package-useage-at> "Build Tools"

        'License :: <license-approved-by> :: <license>', 
        # In general <license-approved-by> OSI Approved and <license> MIT License

        # Python version support all sub-version of 2 and 3
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 3',

        # Un-comment below if your package is for a special purpose
        # 'Framework :: <frame-work>',
        # 'Natural Language :: <language>',
        # 'Operating System :: <os-name>',
        # 'Programming Language :: <programming-language>',
        # 'Topic :: <topic>',
        ],
    keywords = '<package-keywords-seperated-by-space>',
    
    # add folder-names which need to be ignored under exclude=[]
    packages = find_packages(where='.', exclude=['tests', 'data']),
    include_package_data=True,
)`;
            fs.writeFile(path.join(folderPath, "setup.py"), setupContent, err => {
                if(err){
                    console.error(err)
                    return vscode.window.showErrorMessage('Failed to create setup.py file');
                }
                vscode.window.showInformationMessage('Created setup.py file');
            })
            // requirements file
            const requirements = ``
            fs.writeFile(path.join(folderPath, "requirements.txt"), requirements, err => {
                if(err){
                    console.error(err)
                    return vscode.window.showErrorMessage('Failed to create requirements file');
                }
                vscode.window.showInformationMessage('Created requirements file');
            })
            // requirements_dev file
            const requirements_dev = ``
            fs.writeFile(path.join(folderPath, "requirements_dev.txt"), requirements_dev, err => {
                if(err){
                    console.error(err)
                    return vscode.window.showErrorMessage('Failed to create requirements_dev file');
                }
                vscode.window.showInformationMessage('Created requirements_dev file');
            })
            // README file
            const README = `# <package-name>

## <add-badges>

- [Introduction](#introduction)
- [Docs](#docs)
- [Commands](#commands)
- [Pre-requisites](#pre-requisites)
- [Installation and Downloads](#installation-and-downloads)
- [FAQ](#faq)
- [Other Resources](#other-resources)
- [Bug Tracker and Support](#bug-tracker-and-support)
- [Unit-Tests](#unit-tests)
- [License and Copyright](#license-and-copyright)
- [Author and Thanks](#author-and-thanks)

## Introduction

## Docs

## Commands

## Pre-requisites

## Installation and Downloads

## FAQ

- **Question:** <question>?  
 **Answer:** <answer>.

## Other Resources

## Bug Tracker and Support

## Unit Tests

## License and Copyright

## Author and Thanks

<package-name> was developed by [<author-name>](<author-profile-url or github-profile-link>)
`
            fs.writeFile(path.join(folderPath, "README.md"), README, err => {
                if(err){
                    console.error(err)
                    return vscode.window.showErrorMessage('Failed to create README file');
                }
                vscode.window.showInformationMessage('Created README file');
            })
            // MANIFEST file
            const MANIFEST = `include README.md
include LICENSE
include requirements.txt
include requirements_dev.txt
include requirements_dev27.txt
`
            fs.writeFile(path.join(folderPath, "MANIFEST.in"), MANIFEST, err => {
                if(err){
                    console.error(err)
                    return vscode.window.showErrorMessage('Failed to create MANIFEST file');
                }
                vscode.window.showInformationMessage('Created MANIFEST file');
            })
            // TOX file
            const TOX = `[tox]
skip_missing_interpreters = True
envlist = <python-environments>
# envlist = py27, py35, py37

[testenv]
deps = 
    -r{toxinidir}/requirements_dev.txt
commands = 
    pytest --cov=<package-name> -v
`
            fs.writeFile(path.join(folderPath, "tox.ini"), TOX, err => {
                if(err){
                    console.error(err)
                    return vscode.window.showErrorMessage('Failed to create TOX file');
                }
                vscode.window.showInformationMessage('Created TOX file');
            })
            // .gitignore file
            const gitignore = `# Mac OS
.DS_Store
# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
pip-wheel-metadata/
share/python-wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST

# PyInstaller
#  Usually these files are written by a python script from a template
#  before PyInstaller builds the exe, so as to inject date/other infos into it.
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt

# Unit test / coverage reports
htmlcov/
.tox/
.nox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/

# Translations
*.mo
*.pot

# Django stuff:
*.log
local_settings.py
db.sqlite3

# Flask stuff:
instance/
.webassets-cache

# Scrapy stuff:
.scrapy

# Sphinx documentation
docs/_build/

# PyBuilder
target/

# Jupyter Notebook
.ipynb_checkpoints

# IPython
profile_default/
ipython_config.py

# pyenv
.python-version

# celery beat schedule file
celerybeat-schedule

# SageMath parsed files
*.sage.py

# Environments
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Spyder project settings
.spyderproject
.spyproject

# Rope project settings
.ropeproject

# mkdocs documentation
/site

# mypy
.mypy_cache/
.dmypy.json
dmypy.json

# Pyre type checker
.pyre/


# editor
.idea
.vcode
`
            fs.writeFile(path.join(folderPath, ".gitignore"), gitignore, err => {
                if(err){
                    console.error(err)
                    return vscode.window.showErrorMessage('Failed to create .gitignore file');
                }
                vscode.window.showInformationMessage('Created .gitignore file');
            })
            // Pipfile file
            const Pipfile = `
[[source]]
name = "pypi"
url = "https://pypi.org/simple"
verify_ssl = true

[dev-packages]
<add-development-packages>

[packages]
<add-pre-req-python-packages>

[requires]
python_version = "3.7"
`
            fs.writeFile(path.join(folderPath, "Pipfile"), Pipfile, err => {
                if(err){
                    console.error(err)
                    return vscode.window.showErrorMessage('Failed to create Pipfile file');
                }
                vscode.window.showInformationMessage('Created Pipfile file');
            })
            // .travis.yml file
            const travis = `language: python
sudo: false

jobs:
  include:
    - stage: "travis-ci testing 2.7"
      os: linux
      python:
        - '2.7.16'
      install:
        - pip install -r requirements_dev.txt
      script:
        - "export LANG='en_US.UTF-8'"
        - "export LC_ALL='en_US.UTF-8'"
        - "PYTHONIOENCODING=UTF-8 PYTHONPATH=. python -m pytest -v -s --cov=<package-name> tests"

    # add more stages if needed.

    - stage: "travis-ci testing 3.7"
      os: linux
      python:
        - '3.7'
      install:
        - pip install -r requirements_dev.txt
      script:
        - "PYTHONPATH=. pytest -v -s --cov=<package-name> tests"
      after_success:
        - coveralls

    - stage: "pypi deployment"
      deploy:
        provider: pypi
        user: "__token__"
        password:
          secure: <create-pypi-token-and-secure-it-using-travis-before-adding-it>
        on:
          tags: true
      script: echo "Deployment Done..!"
`
            fs.writeFile(path.join(folderPath, ".travis.yml"), travis, err => {
                if(err){
                    console.error(err)
                    return vscode.window.showErrorMessage('Failed to create .travis.yml file');
                }
                vscode.window.showInformationMessage('Created .travis.yml file');
            })
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
}

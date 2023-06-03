from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in task_app/__init__.py
from task_app import __version__ as version

setup(
	name="task_app",
	version=version,
	description="i dont if it\'ll work",
	author="shoumya",
	author_email="shoumyadeepnarayan30@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)

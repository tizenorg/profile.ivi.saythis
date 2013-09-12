PROJECT = saythis
INSTALL_FILES = css js saythis.png index.html README.txt LICENSE

VERSION := 0.0.1
PACKAGE = $(PROJECT)-$(VERSION)

INSTALL_DIR = ${DESTDIR}/opt/usr/apps/.preinstallWidgets

all:
	@echo "Nothing to build"

wgtPkg:
	zip -r $(PROJECT).wgt js css index.html manifest.json config.xml saythis.png

install:
	@echo "Installing saythis, stand by..."
	mkdir -p $(INSTALL_DIR)/
	cp $(PROJECT).wgt $(INSTALL_DIR)/

dist:
	tar czf ../$(PACKAGE).tar.bz2 . 

PROJECT = saythis
INSTALL_FILES = css js icon_128.png index.html README.txt LICENSE

VERSION := 0.0.1
PACKAGE = $(PROJECT)-$(VERSION)
ARCHIVE = $(PACKAGE).tar.bz2

INSTALL_DIR = ${DESTDIR}/usr/share/$(PROJECT)
DESKTOP_DIR = ${DESTDIR}/usr/share/applications
ICON_DIR    = ${DESTDIR}/usr/share/pixmaps

all:
	@echo "Nothing to build"

install:
	mkdir -p $(INSTALL_DIR)/
	cp -a $(INSTALL_FILES) $(INSTALL_DIR)/
	mkdir -p $(DESKTOP_DIR)/
	cp $(PROJECT).desktop $(DESKTOP_DIR)/
	mkdir -p $(ICON_DIR)/
	cp icon_128.png $(ICON_DIR)/$(PROJECT).png

dist:
	tar czf ../$(PACKAGE).tar.bz2 . 

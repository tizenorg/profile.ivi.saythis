Name:       saythis
Summary:    A HTML5 speech to text app
Version:    0.0.1
Release:    1
Group:      Applications/System
License:    Apache 2.0
URL:        http://www.tizen.org2
Source0:    %{name}-%{version}.tar.bz2
BuildRequires:  zip
BuildRequires:  desktop-file-utils
Requires:   wrt-installer

%description
A HTML5 speech to text app

%prep
%setup -q -n %{name}-%{version}

%build

make wgtPkg

#make %{?jobs:-j%jobs}

%install
rm -rf %{buildroot}
%make_install

%post
if [ -f /opt/usr/apps/.preinstallWidgets/preinstallDone ]; then
    wrt-installer -i /opt/usr/apps/.preinstallWidgets/saythis.wgt;
fi

%files
%defattr(-,root,root,-)
/opt/usr/apps/.preinstallWidgets/saythis.wgt

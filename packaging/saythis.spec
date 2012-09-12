Name:       saythis
Summary:    A HTML5 speech to text app
Version:    0.0.1
Release:    1
Group:      Applications/System
License:    Apache 2.0
URL:        http://www.tizen.org2
Source0:    %{name}-%{version}.tar.bz2
Requires:   remotecontrol
Requires:   webskeleton
BuildRequires:  desktop-file-utils

%description
A HTML5 speech to text app

%prep
%setup -q -n %{name}-%{version}

%build

make %{?jobs:-j%jobs}

%install
rm -rf %{buildroot}
%make_install

desktop-file-install --delete-original       \
  --dir %{buildroot}%{_datadir}/applications             \
   %{buildroot}%{_datadir}/applications/*.desktop

%files
%defattr(-,root,root,-)
%{_datadir}/saythis
%{_datadir}/applications/saythis.desktop
%{_datadir}/pixmaps/saythis.png

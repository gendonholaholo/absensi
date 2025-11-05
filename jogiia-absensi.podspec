Pod::Spec.new do |s|
 s.name = 'jogiia-absensi'
 s.version = '0.0.1'
 s.license = { :type => "MIT", :file => "LICENSE" }
 s.summary = 'Untuk keperluan absen dengan live geo location'
 s.homepage = 'portfoliogos.info'
 s.social_media_url = 'https://twitter.com/-'
 s.authors = { "Gos" => "fafaghaws@live.com" }
 s.source = { :git => "https://github.com/gendonholaholo/jogiia-absensi.git", :tag => "v"+s.version.to_s }
 s.platforms = { :ios => "9.0", :osx => "10.10", :tvos => "9.0", :watchos => "2.0" }
 s.requires_arc = true

 s.default_subspec = "Core"
 s.subspec "Core" do |ss|
     ss.source_files  = "Sources/**/*.swift"
     ss.framework  = "Foundation"
 end
end

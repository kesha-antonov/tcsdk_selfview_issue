
Pod::Spec.new do |s|
  s.name         = "RNTrueConfSdk"
  s.version      = "1.0.0"
  s.summary      = "RNTrueConfSdk"
  s.description  = <<-DESC
                  RNTrueConfSdk
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "9.0"
  s.source       = { :git => "https://github.com/author/RNTrueConfSdk.git", :tag => "master" }
  s.source_files  = "*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  s.vendored_frameworks = "TrueConfSDKNative/TrueConfSDK.framework"
  #s.dependency "others"

end

  
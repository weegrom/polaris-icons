#!/usr/bin/env ruby
require 'json'
require 'net/https'

def version_exists?
  uri = URI("https://packages.shopify.io/api/v1/repos/shopify/gems/package/gem/polaris_icons/#{ARGV[0]}.json")
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  request = Net::HTTP::Get.new(uri.request_uri)
  request.basic_auth(ENV['PACKAGECLOUD_TOKEN'], '')
  res = http.request(request)
  res.kind_of? Net::HTTPSuccess
end

if version_exists? then
  puts "ERROR: The version you're trying to publish already exists in packagecloud"
  exit 1
end


exit 1 unless system('bundle', 'exec', 'package_cloud', 'push', 'shopify/gems', "pkg/polaris_icons-#{ARGV[0]}.gem", {
  chdir: "#{__dir__}/../packages-ruby/polaris_icons"
})

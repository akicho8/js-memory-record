task :default => :test

task :t => :test
desc "[t] test"
task :test do
  system <<~EOT
  jest
  EOT
end

task :r => :release
desc "release"
task :release do
  system <<~EOT, exception: true
  true &&
    jest &&
    rake build &&
    git add -A &&
    git commit -m '[chore] npm run build' &&
    npm run build:commit &&
    npm version patch &&
    git push --tags &&
    npm publish &&
    true
  EOT
end

task :b => :build
desc "[b] build"
task :build do
  system <<~EOT, exception: true
  babel src -d lib --source-maps --no-comments
  exa -lh lib
  EOT
end

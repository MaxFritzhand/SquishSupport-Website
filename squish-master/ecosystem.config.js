module.exports = {
  apps: [
    {
      name: "squish-frontend",
      env: {
        PORT: 3000,
        NODE_ENV: "production"
      }
    }
  ],
  deploy: {
    production: {
      user: "ubuntu",
      host: "ec2-13-58-164-125.us-east-2.compute.amazonaws.com",
      key: "~/.ssh/squish-backend.pem",
      ref: "origin/master",
      repo: "git@github.com:SquishLLC/Website.git",
      path: "/home/ubuntu/squish-frontend",
      "post-deploy":
        "cd squish-master && npm install && npm run build && sudo cp -r build/* /var/www/squishsupport.com/"
    }
  }
};
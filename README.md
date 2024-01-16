# Mind IT Workflow Management - Frontend

This is a tool to manage Projects and their Tasks

## Installation

Use the package manager [npm] to install node_modules.

```bash
# installs required node_modules
npm install

# Copy .env.example to .env for creating your local copy
cp .env.example .env
```

## Usage

```bash
npm start
```

## Deployment
```bash
# To update the Ubuntu packages
sudo apt update

# To upgrade the Ubuntu packages
sudo apt upgrade

# Install Nginx for virtual host and reverse proxy
sudo apt install nginx 

# Import Nodejs packages and running installation
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Check for Node JS installation and version
node -v

# Install PM2 for React and Node service monitoring
sudo npm install pm2 -g

# Upgrading npm version
sudo npm install -g npm@9.6.6

# CD to home directory
cd

# Create project directory (if does not exist)
mkdir <project_name>

# CD to move into the newly created directory
cd <project_name>/

# Clone front-end repo
git clone https://<repo_url>.git

# List directory to check for cloned directory
ll

# CD to move into the cloned front-end directory
cd <front-end_dir>

# Install node_modules for front-end
npm install

# Copy .env.example with .env
cp .env.example .env

# Open .env file in edit mode and fill the required credentials
vim .env

# Move back to previous directory
cd ../

# Clone back-end repo
git clone https://<repo_url>.git

# List directory to check for cloned directory
ll

# CD to move into the cloned back-end directory
cd <back-end_dir>

# Install node_modules for back-end
npm install
```

### Creating Server Blocks(VirtualHost)
```bash
# Create and open server block file
sudo vim /etc/nginx/sites-available/mindit-workflow-management
```

### Enter edit mode and paste the following code
```bash
server {
    server_name your-domain.com;
    index index.html index.htm;
    location / {
        proxy_pass http://localhost:3000;
    }
}
server {
    server_name api.your-domain.com;
    location / {
        proxy_pass http://localhost:4000;
    }
}
```
##### This code is to create Server Block (virtual host) on the Nginx server to reverse proxy the 80 port to serve content of 3000(front-end) and 4000(back-end)

```bash
# Create symbolic link of server block in enabled directory (This basically enables the configuration)
sudo ln -s /etc/nginx/sites-available/mindit-workflow-management  /etc/nginx/sites-enabled/

# Check for symbolic link creation
ll /etc/nginx/sites-enabled/

# Move back to front-end directory
cd ../<front-end_dir>/

# Create build for front-end
npm run build

# Serve build / Launch app using build via PM2
pm2 start app.config.json

# Move back to backend directory
cd ../<back-end_dir>/

# Copy .env.example with .env
cp .env.example .env

# Open .env file in edit mode and fill the required credentials
vim .env

# Restart Nginx service to adapt configuration changes
sudo service nginx restart

# Serve / Launch backend service via PM2
pm2 start ./bin/www --name hn-nodejs

# List all PM2 running services
pm2 list
```

# Merge Request Template

Changes made in this merge request are related to:

 

[TicketNumber - One line brief of ticket](https://sprints.zoho.in/team/minditsystems)

 

> Brief description of the solution implemented.

 

Please ensure the following guidelines have been properly followed in this merge request:

 

- [ ] Followed self code review checklist.

- [ ] Linting of the code is done.

- [ ] Logs are implemented properly (Optional).

- [ ] Unit testing is done for the code change.

- [ ] Merge request is labeled properly (Optional).

- [ ] Reviewer is assigned for this merge request.

- [ ] Assignee is assigned for this merge request.

 

> Any additional comment that developer wants to add for the merge request (Optional)?

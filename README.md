Setup:
```
git checkout beta 
git pull origin beta 
git checkout -b <your-branch>
npm install
npm run start
```
ONLY WORK ON YOUR BRANCH. 

Make sure you signed in as a test user so you can make authenticated requests. 

(IF S3 DEPLOY IS NOT WORKING)
It's likely Cloudfront caching the previous deployment.

You can either change your cache settings to disable caching entirely, or run an invalidation on your distribution to effectively purge the cache.

aws cloudfront create-invalidation --distribution-id distribution_ID --paths "/*"
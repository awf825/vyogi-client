## IMPORTANT SCRIPTS, GOTCHAS, AND THINGS TO KNOW
(IF S3 DEPLOY IS NOT WORKING)
It's likely Cloudfront caching the previous deployment.

You can either change your cache settings to disable caching entirely, or run an invalidation on your distribution to effectively purge the cache.

aws cloudfront create-invalidation --distribution-id distribution_ID --paths "/*"
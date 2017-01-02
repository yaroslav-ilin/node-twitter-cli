# Command Line Basic Twitter API Client
A simple tool for basic operating with Twitter API from the command line.

## Get started
Install with as simple as:
```
npm install -g twi-cli
```
You can use it then from anywhere on your command line.

## Examples of usage
To issue a `GET` request to `statuses/user_timeline` endpoint to get 1 latest tweet from a user with id 62569723 you may run the following command:
```
$ twi-cli statuses user_timeline --count=1 --trim_user=1 --user_id=62569723
```

You may fetch all tweets from that same user recursively with only one additional arguments `--recursive`:
```
$ twi-cli statuses user_timeline --recursive --count=200 --trim_user=1 --user_id=62569723
```
This magical flag `--recursive` (or `-r` for short alias) will handle [cursoring](https://dev.twitter.com/overview/api/cursoring) for you as well.

Here is how to lookup `user_id` for some user by a `screen_name`:
```
$ twi-cli users show --screen_name=nilfalse
```

## Authentication
For now there is only one way to provide the tool with Twitter credentials – use environment variables.

These include:
- `TWITTER_CONSUMER_KEY`
- `TWITTER_CONSUMER_SECRET`
- `TWITTER_ACCESS_TOKEN_KEY`
- `TWITTER_ACCESS_TOKEN_SECRET`
- `TWITTER_BEARER_TOKEN`

Use any of these (or any combination) which fits your needs best.

*NOTE: for Application Only based authentication, the only env required is `TWITTER_BEARER_TOKEN`.*
You may read more about [Application-only authentication](https://dev.twitter.com/oauth/application-only) at Twitter docs.

## Output
The tool tries its best to keep its output as similar to the original Twitter response as possible so you are not enforced to learn one more layer of abstraction.
At the same time there are a few little exceptions to this rule, as author considers these to be useful for the most cases:

1. Any `id`s get replaced with their `id_str` counterparts (with redundant `id_str` being completely stripped from output). This includes all fields ending with `id_str`, for instance `in_reply_to_status_id` gets always replaced with value from `in_reply_to_status_id_str` (even if it is `null`).
2. All fields with name `created_at` (including nested at any level of deep) get parsed into ISO 8601 compliant string. For instance, `2017-01-01T08:38:40Z`.
3. Most of the time Twitter response is an array of some entities.
   For the purposes of extensibility top-level arrays get printed without enclosing square brackets `[]` and items *are not* separated by commas `,`.
   Instead, every item is put on its own one line, so the next item is the next line and so forth.
   This must eventually simplify streaming once the code for it is ready.
4. Cursored responses in `--recursive` mode will output content of their `ids` field as the cursors are already handled by `twi-cli` at that moment.

## TODO
1. Add option to request Application-only Bearer token from command line.
2. Make streaming possible using this tool.

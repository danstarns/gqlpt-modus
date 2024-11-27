# Modus + GraphQL Plain Text

This project showcases how you can issue a plain text query to any Modus endpoint and get a valid response.

Under the hood it uses [GQLPT](https://www.gqlpt.dev), creating a custom Modus adapter that wraps an exposed `generateText` resolver talking to `@hypermode/modus-sdk-as/models/openai/chat`.

## Quick Start

Run the example in the `/gqlpt` folder:

```bash
npx tsx ./gqlpt/index.ts "Get a random quote"
```

## How It Works

When you run the example, it:

1. Introspects the Modus endpoint
2. Generates a prompt based on the query and schema
3. Proxies the prompt using the custom Modus Adapter
4. Sends the generated query to the Modus endpoint
5. Prints the response

## Example Output

```bash
npx tsx ./gqlpt/index.ts "Get a random quote"
Question: Get a random quote
Response: {
  errors: undefined,
  data: {
    randomQuote: {
      author: 'Ralph Waldo Emerson',
      quote: 'For every minute you are angry you lose sixty seconds of happiness.'
    }
  }
}
```

## Requirements

- Node.js 22+
- TinyGo 0.34.0+
- Running Modus instance

## License

MIT

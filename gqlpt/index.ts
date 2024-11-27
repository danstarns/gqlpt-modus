import { GQLPTClient } from "gqlpt";
import { Adapter } from "@gqlpt/adapter-base";

const MODUS_URL = "http://localhost:8686/graphql";

class ModusAdapter extends Adapter {
  constructor() {
    super();
  }

  async connect(): Promise<void> {
    try {
      const response = await fetch(MODUS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: /* GraphQL */ `
            query {
              __schema {
                queryType {
                  name
                }
              }
            }
          `,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to connect: ${response.statusText}`);
      }

      const result = await response.json();
      if (result.errors) {
        throw new Error(
          `GraphQL errors: ${result.errors.map((e: any) => e.message).join(", ")}`,
        );
      }
    } catch (error) {
      console.error("Error connecting to the GraphQL endpoint:", error);
      throw error;
    }
  }

  async sendText(query: string) {
    const response = await fetch(MODUS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          query ($prompt: String!) {
            generateText(prompt: $prompt)
          }
        `,
        variables: { prompt: query },
      }),
    });

    const json = await response.json();

    return {
      content: json.data.generateText,
      conversationId: "1",
    };
  }
}

async function main() {
  const question = process.argv[2];

  console.log("Question:", question);

  const client = new GQLPTClient({
    url: MODUS_URL,
    adapter: new ModusAdapter(),
    excludedQueries: ["generateText"],
  });
  await client.connect();

  const response = await client.generateAndSend(question);

  console.log("Response:", response);
}

main();

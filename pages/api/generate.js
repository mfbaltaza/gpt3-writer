import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `This is a chat with Doug. He loves technology.  Is pretty Stoic. Loves rap music and is into that culture heavily, even uses some of that lingo. He promotes loving yourself first. Prioritizing your purpose in life. Also lift weights. He doesn't talk like an advice guru. Actually, he's pretty raw and straight to the point. Swears often, also does it in spanish. Speaks spanish too and is ruthless sometimes. 

Me: `;
const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}.\n`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;

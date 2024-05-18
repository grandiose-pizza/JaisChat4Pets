This pull request introduces changes to the `chat-page.tsx` to update the default system prompts based on the user's language selection and ensure the prompt updates immediately when the language is changed.

### Changes Made:
- Added a `defaultSystemPrompts` object to store the user-provided English and Arabic system prompts.
- Implemented a `React.useEffect` hook to dynamically update the `systemPrompt` in the `chatOptions` state when the `language` property changes.
- Included `defaultSystemPrompts` and `setChatOptions` in the dependency array of the `useEffect` hook to ensure prompt updates correctly.

### Checklist:
- [ ] Review the code changes for accuracy and completeness.
- [ ] Test the changes to ensure the system prompt updates correctly based on language selection without requiring a page refresh.
- [ ] Verify that no runtime errors occur when switching languages.

This PR was written by [Devin](https://devin.ai/) :angel:

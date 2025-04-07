import { root } from '@lynx-js/react';

import { ChatbotApp } from './screens/chatbot/ChatbotApp.jsx';

// root.render(<TodoApp />)
root.render(<ChatbotApp />);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}

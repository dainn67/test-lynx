import { root } from '@lynx-js/react';

import { ChatbotApp } from './screens/chatbot/ChatbotApp.jsx';
import { GameStoreApp } from './screens/gameStore/GameStoreApp.jsx';
import { MemoryRouter, Routes, Route } from 'react-router';

import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

// root.render(<TodoApp />)
// root.render(<ChatbotApp />)
root.render(
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<GameStoreApp />} />
        <Route path="/chat/:id" element={<ChatbotApp />} />
      </Routes>
    </MemoryRouter>
  </QueryClientProvider>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}

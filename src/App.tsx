
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { RecipesPage } from './pages/RecipesPage';
import { BrewPage } from './pages/BrewPage';
import { InventoryPage } from './pages/InventoryPage';
import { JournalPage } from './pages/JournalPage';
import { RecipeBuilderPage } from './pages/RecipeBuilderPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/journal" element={<JournalPage />} />
                    <Route path="/recipes" element={<RecipesPage />} />
                    <Route path="/brew" element={<BrewPage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/builder" element={<RecipeBuilderPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

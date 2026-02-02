import * as React from "react";
import axios from "axios";
import { SERVER_URL } from "../../helpers/Constants";

const FormContainer: React.FunctionComponent = () => {
    const [fullUrl, setFullUrl] = React.useState<string>("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`${SERVER_URL}/shorturl`, { fullUrl: fullUrl, });
            setFullUrl("");
        } catch (error) {
            console.error( error);
        }
    };
    return (
        <div className="container mx-auto px-4">
            <div className="my-8 rounded-2xl bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 py-20 px-8 shadow-2xl">
                <h2 className="text-white text-5xl font-black text-center mb-3">URL Shortner</h2>
                <p className="text-white text-lg text-center mb-2 font-light opacity-90">Shorten your long URLs easily and share them with a click!</p>
                <p className="text-white text-sm text-center mb-8 font-thin opacity-80">Transform lengthy web addresses into compact, manageable links instantly.</p>
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                    <div className="flex gap-3 flex-col sm:flex-row">
                        <div className="relative flex-1">
                            <span className="absolute inset-y-0 start-0 flex items-center ps-4 text-gray-700 font-bold text-base pointer-events-none bg-white/95 rounded-lg pl-4 pr-2">urlshortner.link/</span>
                            <input 
                                type="text" 
                                placeholder="paste your long link here" 
                                required 
                                className="block w-full pl-64 py-3 px-4 rounded-lg bg-white/95 border-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white text-gray-800 placeholder-gray-400 font-medium transition"
                                value={fullUrl}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullUrl(e.target.value)}    
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition transform hover:scale-105 active:scale-95 shadow-md"
                        >
                            Shorten URL
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormContainer;

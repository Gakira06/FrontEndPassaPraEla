import React, { useState, useEffect } from "react";
import HeaderUniversal from "../components/layout/HeaderUniversal";
import Footer from "../components/layout/Footer";

export default function RankingPage() {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRanking = async () => {
            try {
                const response = await fetch("http://localhost:3001/ranking");
                if (!response.ok) {
                    throw new Error("Não foi possível carregar o ranking.");
                }
                const data = await response.json();
                setRanking(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRanking();
    }, []);

    if (loading) return <div className="text-center p-8">Carregando ranking...</div>;
    if (error) return <div className="text-center p-8 text-red-500">Erro: {error}</div>;

    return (
        <>
            <HeaderUniversal />
            <div className="bg-gray-100 min-h-screen p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-4xl font-bold text-center mb-8">Ranking de Usuários</h1>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-4">Posição</th>
                                <th className="p-4">Nome do Time</th>
                                <th className="p-4">Pontuação Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((time, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-4 font-bold">{index + 1}º</td>
                                    <td className="p-4">{time.nome_time}</td>
                                    <td className="p-4">{time.pontuacao_total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}
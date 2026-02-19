/**
 * ==========================================================================
 * DSA PROFILE COMPONENT - FIXED ALFA API PARSING
 * ==========================================================================
 */

import {
  Code2,
  TrendingUp,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';

const DSA = () => {
  const [leetcodeData, setLeetcodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const LEETCODE_USERNAME = 'Karunanidhi16';
  const GFG_USERNAME = 'karunanidh5pe4';

  const fetchLeetCodeStats = async () => {
    const endpoints = [
      {
        url: `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`,
        type: 'alfa'
      },
      {
        url: `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USERNAME}`,
        type: 'faisal'
      },
      {
        url: `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`,
        type: 'heroku'
      }
    ];

    for (const endpoint of endpoints) {
      try {
        console.log('Trying endpoint:', endpoint.url);
        const response = await fetch(endpoint.url);

        if (!response.ok) {
          console.log('Endpoint failed with status:', response.status);
          continue;
        }

        const data = await response.json();
        console.log('Got data from', endpoint.type, ':', data);

        let normalizedData = null;

        // Parse based on API type
        if (endpoint.type === 'alfa') {
          // Alfa API format
          if (data.solvedProblem !== undefined) {
            normalizedData = {
              totalSolved: data.solvedProblem || 0,
              easySolved: data.easySolved || 0,
              mediumSolved: data.mediumSolved || 0,
              hardSolved: data.hardSolved || 0,
              ranking: data.ranking || 0,
              acceptanceRate: 0
            };
          }
        } else if (endpoint.type === 'faisal') {
          // Faisal API format
          if (data.totalSolved !== undefined || data.total_solved !== undefined) {
            normalizedData = {
              totalSolved: data.totalSolved || data.total_solved || 0,
              easySolved: data.easySolved || data.easy_solved || 0,
              mediumSolved: data.mediumSolved || data.medium_solved || 0,
              hardSolved: data.hardSolved || data.hard_solved || 0,
              ranking: data.ranking || 0,
              acceptanceRate: data.acceptanceRate || 0
            };
          }
        } else {
          // Heroku API format (standard)
          if (data.totalSolved !== undefined) {
            normalizedData = {
              totalSolved: data.totalSolved || 0,
              easySolved: data.easySolved || 0,
              mediumSolved: data.mediumSolved || 0,
              hardSolved: data.hardSolved || 0,
              ranking: data.ranking || 0,
              acceptanceRate: data.acceptanceRate || 0
            };
          }
        }

        if (normalizedData && normalizedData.totalSolved >= 0) {
          console.log('✅ Successfully parsed data:', normalizedData);
          setLeetcodeData(normalizedData);
          setError(null);
          return; // Success!
        } else {
          console.log('❌ Could not parse data from:', endpoint.type);
          continue;
        }
      } catch (err) {
        console.error('Error with endpoint:', endpoint.url, err);
        continue;
      }
    }

    // All endpoints failed
    console.error('❌ All endpoints failed');
    setError('Unable to fetch LeetCode stats. API temporarily unavailable.');
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchLeetCodeStats();
      setLoading(false);
      setLastUpdated(new Date());
    };

    load();

    // Auto-refresh every 5 minutes
    const interval = setInterval(load, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const calculateProficiency = (t) => {
    if (t >= 500) return 95;
    if (t >= 300) return 85;
    if (t >= 200) return 75;
    if (t >= 100) return 65;
    if (t >= 50) return 50;
    return Math.min((t / 50) * 50, 45);
  };

  const getLabel = (p) => {
    if (p >= 90) return 'Expert';
    if (p >= 75) return 'Advanced';
    if (p >= 60) return 'Intermediate';
    if (p >= 40) return 'Beginner';
    return 'Learning';
  };

  const handleRefresh = async () => {
    setLoading(true);
    await fetchLeetCodeStats();
    setLoading(false);
    setLastUpdated(new Date());
  };

  return (
    <section
      id="dsa"
      className="min-h-screen py-20 px-4 relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code2 className="text-blue-400" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              DSA Profiles
            </h2>
          </div>
          <p className="text-gray-400 text-lg">
            My competitive programming journey
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {error
              ? error
              : `Last updated: ${lastUpdated.toLocaleTimeString()}`}
          </p>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">

          {/* ==================== LEETCODE CARD ==================== */}
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 transform hover:-translate-y-2">

            {/* Status Badge */}
            <div className="absolute top-4 right-4">
              {leetcodeData && !error ? (
                <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1">
                  <CheckCircle size={12} className="text-green-400" />
                  <span className="text-xs text-green-400 font-semibold">LIVE</span>
                </div>
              ) : loading ? (
                <div className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/50 rounded-full px-3 py-1">
                  <RefreshCw size={12} className="text-blue-400 animate-spin" />
                  <span className="text-xs text-blue-400 font-semibold">LOADING</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full px-3 py-1">
                  <AlertCircle size={12} className="text-yellow-400" />
                  <span className="text-xs text-yellow-400 font-semibold">OFFLINE</span>
                </div>
              )}
            </div>

            {/* Card Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                  alt="LeetCode"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">LeetCode</h3>
                <a
                  href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-orange-400 transition flex items-center gap-1"
                >
                  @{LEETCODE_USERNAME}
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Content */}
            {leetcodeData ? (
              <>
                {/* Proficiency Bar */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2 text-sm text-gray-400">
                    <span>Proficiency</span>
                    <span className="text-orange-400 font-semibold">
                      {getLabel(calculateProficiency(leetcodeData.totalSolved))}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-1000"
                      style={{
                        width: `${calculateProficiency(leetcodeData.totalSolved)}%`
                      }}
                    />
                  </div>
                  <div className="text-right mt-1">
                    <span className="text-xs text-gray-500">
                      {calculateProficiency(leetcodeData.totalSolved)}%
                    </span>
                  </div>
                </div>

                {/* Total Solved */}
                <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-4 text-center mb-4">
                  <p className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    {leetcodeData.totalSolved}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">Total Solved</p>
                </div>

                {/* Difficulty Breakdown */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center border border-green-500/30">
                    <p className="text-xl font-bold text-green-400">
                      {leetcodeData.easySolved}
                    </p>
                    <p className="text-xs text-gray-400">Easy</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center border border-yellow-500/30">
                    <p className="text-xl font-bold text-yellow-400">
                      {leetcodeData.mediumSolved}
                    </p>
                    <p className="text-xs text-gray-400">Medium</p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-3 text-center border border-red-500/30">
                    <p className="text-xl font-bold text-red-400">
                      {leetcodeData.hardSolved}
                    </p>
                    <p className="text-xs text-gray-400">Hard</p>
                  </div>
                </div>

                {/* Ranking */}
                {leetcodeData.ranking > 0 && (
                  <div className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-purple-400">
                      <TrendingUp size={16} />
                      <span className="text-sm text-gray-400">Global Ranking</span>
                    </div>
                    <span className="text-sm font-bold text-white">
                      #{leetcodeData.ranking.toLocaleString()}
                    </span>
                  </div>
                )}
              </>
            ) : (
              // Placeholder when loading or error
              <div className="text-center py-8">
                <div className="text-6xl mb-4">💻</div>
                <p className="text-gray-400 mb-4">
                  {loading ? 'Loading stats...' : 'Unable to load stats'}
                </p>
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-xs text-red-400">{error}</p>
                  </div>
                )}
                <a
                  href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:opacity-90 transition"
                >
                  View Profile
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>

          {/* ==================== ALL CODING PROFILES CARD ==================== */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 transform hover:-translate-y-2">

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg text-3xl">
                🚀
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Coding Profiles
                </h3>
                <p className="text-sm text-gray-400">
                  Visit all my competitive profiles
                </p>
              </div>
            </div>

            {/* Profile Links */}
            <div className="space-y-4">

              {/* LeetCode Link */}
              <a
                href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-xl p-4 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                      alt="LeetCode"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold group-hover:text-orange-400 transition">
                      LeetCode
                    </p>
                    <p className="text-xs text-gray-400">@{LEETCODE_USERNAME}</p>
                  </div>
                </div>
                <ExternalLink className="text-orange-400 group-hover:translate-x-1 transition" size={18} />
              </a>

              {/* GeeksforGeeks Link */}
              <a
                href={`https://www.geeksforgeeks.org/user/${GFG_USERNAME}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
                      alt="GeeksforGeeks"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-white font-semibold group-hover:text-green-400 transition">
                      GeeksforGeeks
                    </p>
                    <p className="text-xs text-gray-400">@{GFG_USERNAME}</p>
                  </div>
                </div>
                <ExternalLink className="text-green-400 group-hover:translate-x-1 transition" size={18} />
              </a>

              {/* GitHub Link */}
              <a
                href="https://github.com/Karunanidhisharma16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-gradient-to-r from-gray-500/10 to-gray-600/10 border border-gray-500/30 rounded-xl p-4 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-500/20 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold group-hover:text-gray-300 transition">
                      GitHub
                    </p>
                    <p className="text-xs text-gray-400">@Karunanidhisharma16</p>
                  </div>
                </div>
                <ExternalLink className="text-gray-400 group-hover:translate-x-1 transition" size={18} />
              </a>

            </div>

            {/* Bottom Note */}
            <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-gray-400 text-center">
                💡 Click any profile to view my complete solutions and progress
              </p>
            </div>
          </div>

        </div>


      </div>
    </section>
  );
};

export default DSA;
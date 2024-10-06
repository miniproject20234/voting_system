// Dashboard.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  
  // Example election and candidates (hardcoded for UI purposes)
  const election = {
    name: '2024 Presidential Election',
    candidates: [
      { id: 1, name: 'John Doe', party: 'Democratic Party' },
      { id: 2, name: 'Jane Smith', party: 'Republican Party' },
      { id: 3, name: 'Sam Lee', party: 'Green Party' },
    ],
  };

  // Handle vote submission
  const handleVoteSubmit = () => {
    if (!selectedCandidate) {
      toast.error('Please select a candidate before submitting your vote.');
      return;
    }
    toast.success(`Vote submitted for ${selectedCandidate.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Election Title */}
        <h1 className="text-4xl font-bold text-center mb-8">{election.name}</h1>

        {/* Candidates List */}
        <div className="space-y-6">
          {election.candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                selectedCandidate?.id === candidate.id
                  ? 'bg-blue-100 border-blue-400'
                  : 'bg-white border-gray-300'
              }`}
              onClick={() => setSelectedCandidate(candidate)}
            >
              {/* Candidate Info */}
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="candidate"
                  checked={selectedCandidate?.id === candidate.id}
                  className="form-radio h-5 w-5 text-blue-600"
                  readOnly
                />
                <div>
                  <h2 className="text-xl font-semibold">{candidate.name}</h2>
                  <p className="text-gray-600">{candidate.party}</p>
                </div>
              </div>

              {/* Vote Button (Only Highlighted Candidate) */}
              <div className="text-right">
                <button
                  className={`${
                    selectedCandidate?.id === candidate.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  } px-4 py-2 rounded-md`}
                  disabled={selectedCandidate?.id !== candidate.id}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Vote Button */}
        <div className="mt-8 text-center">
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
            onClick={handleVoteSubmit}
          >
            Submit Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

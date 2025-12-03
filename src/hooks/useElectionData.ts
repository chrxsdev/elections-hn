import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchElectionData, fetchVoteRecords } from '../services/electionService';
import type { Candidate, VoteRecords } from '../types/election';

interface ElectionDataState {
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  firstPlace: Candidate | null;
  secondPlace: Candidate | null;
  voteDifference: number;
  timestamp: string;
  voteRecords: VoteRecords | null;
}

interface UseElectionDataReturn extends ElectionDataState {
  refresh: () => void;
}

export const useElectionData = (refreshIntervalMinutes: number = 3): UseElectionDataReturn => {
  console.log(refreshIntervalMinutes)
  const [state, setState] = useState<ElectionDataState>({
    loading: true,
    refreshing: false,
    error: null,
    firstPlace: null,
    secondPlace: null,
    voteDifference: 0,
    timestamp: '',
    voteRecords: null,
  });

  const isMountedRef = useRef(true);

  const loadData = useCallback(async (isAutoRefresh = false) => {
    if (!isMountedRef.current) return;

    setState(prev => ({
      ...prev,
      refreshing: isAutoRefresh,
      error: null,
    }));

    try {
      const [data, records] = await Promise.all([
        fetchElectionData(),
        fetchVoteRecords(),
      ]);
      
      if (!isMountedRef.current) return;

      const fetchTime = new Date().toISOString();

      // Normalize and validate vote counts
      const normalizedCandidates = data.candidatos.map(candidate => ({
        ...candidate,
        votos: Number(candidate.votos) || 0,
      }));

      // Sort candidates by votes (descending order)
      const sortedCandidates = [...normalizedCandidates].sort(
        (a, b) => b.votos - a.votos
      );

      const first = sortedCandidates[0];
      const second = sortedCandidates[1];
      const difference = first.votos - second.votos;

      setState({
        loading: false,
        refreshing: false,
        error: null,
        firstPlace: first,
        secondPlace: second,
        voteDifference: difference,
        timestamp: fetchTime,
        voteRecords: records,
      });
    } catch (err) {
      if (!isMountedRef.current) return;

      setState(prev => ({
        ...prev,
        loading: false,
        refreshing: false,
        error: err instanceof Error ? err.message : 'Ocurrió un error',
      }));
    }
  }, []);

  const refresh = useCallback(() => {
    loadData(true);
  }, [loadData]);

  useEffect(() => {
    isMountedRef.current = true;

    // Initial load
    loadData();

    // Set up auto-refresh interval
    const intervalId = setInterval(() => {
      loadData(true);
    }, refreshIntervalMinutes * 60 * 1000);

    return () => {
      isMountedRef.current = false;
      clearInterval(intervalId);
    };
  }, [loadData, refreshIntervalMinutes]);

  return {
    ...state,
    refresh,
  };
};

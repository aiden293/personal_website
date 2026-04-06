import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

type Language = 'ko' | 'en';

interface PlaylistTrack {
  id: number;
  title: string;
  artist: string;
}

interface MusicState {
  isPlaying: boolean;
  currentTrack: number;
  playlist: PlaylistTrack[];
}

interface MusicControls {
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: number) => void;
}

const translations = {
  ko: {
    music: '🎵 음악 플레이어',
    description: '좋아하는 음악을 들으면서 편하게 휴식하세요.',
    playing: '▶ 재생 중...',
    paused: '⏸ 일시정지',
    playlist: '재생목록',
    hint: '💡 실제 음악 스트리밍을 위해 Spotify API나 YouTube API를 연동할 수 있습니다.'
  },
  en: {
    music: '🎵 Music Player',
    description: 'Enjoy your favorite music and relax.',
    playing: '▶ Playing...',
    paused: '⏸ Paused',
    playlist: 'Playlist',
    hint: '💡 You can integrate Spotify API or YouTube API for real music streaming.'
  }
};

export default function MusicPlayer({ 
  language = 'ko', 
  musicState,
  musicControls
}: { 
  language?: Language;
  musicState?: MusicState;
  musicControls?: MusicControls;
}) {
  const t = translations[language];

  // Use provided state or manage locally
  const [localIsPlaying, setLocalIsPlaying] = useState(false);
  const [localCurrentTrack, setLocalCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);

  // Use props if provided, otherwise use local state
  const isPlaying = musicState?.isPlaying ?? localIsPlaying;
  const currentTrack = musicState?.currentTrack ?? localCurrentTrack;
  const playlist = musicState?.playlist ?? [
    { id: 1, title: 'Beautiful Morning', artist: 'Indie Artists' },
    { id: 2, title: 'Sunset Dreams', artist: 'Lo-Fi Beats' },
    { id: 3, title: 'Digital Love', artist: 'Synthwave Band' },
    { id: 4, title: 'Forest Walk', artist: 'Nature Sounds' },
    { id: 5, title: 'City Lights', artist: 'Jazz Trio' },
    { id: 6, title: 'Ocean Waves', artist: 'Ambient Music' },
  ];

  const setIsPlayingFn = musicControls?.setIsPlaying ?? setLocalIsPlaying;
  const setCurrentTrackFn = musicControls?.setCurrentTrack ?? setLocalCurrentTrack;

  const trackDuration = 180; // 3 minutes in seconds

  const handlePlayPause = () => {
    setIsPlayingFn(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrackFn(currentTrack === 0 ? playlist.length - 1 : currentTrack - 1);
    setCurrentTime(0);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentTrackFn(currentTrack === playlist.length - 1 ? 0 : currentTrack + 1);
    setCurrentTime(0);
    setProgress(0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    setCurrentTime((newProgress / 100) * trackDuration);
  };

  const handleTrackClick = (idx: number) => {
    setCurrentTrackFn(idx);
    setCurrentTime(0);
    setProgress(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="main-content">
      <h2 className="section-title">{t.music}</h2>
      
      <p className="section-content" style={{ marginBottom: '20px' }}>
        {t.description}
      </p>

      <div className="music-player">
        {/* Now Playing */}
        <div style={{ 
          padding: '15px',
          background: 'white',
          borderRadius: '4px',
          marginBottom: '15px',
          textAlign: 'center',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎧</div>
          <div style={{ 
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#0066cc'
          }}>
            {playlist[currentTrack].title}
          </div>
          <div style={{ 
            fontSize: '11px',
            color: '#999',
            marginTop: '5px'
          }}>
            {playlist[currentTrack].artist}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '10px' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: '#ddd',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Time Display */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#666',
          marginBottom: '15px'
        }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(trackDuration)}</span>
        </div>

        {/* Player Controls */}
        <div className="player-controls">
          <button 
            className="btn"
            onClick={handlePrevious}
            title={language === 'ko' ? "이전곡" : "Previous"}
          >
            <SkipBack size={16} style={{ display: 'inline' }} />
          </button>
          <button 
            className="btn"
            onClick={handlePlayPause}
            title={isPlaying ? (language === 'ko' ? "일시정지" : "Pause") : (language === 'ko' ? "재생" : "Play")}
            style={{
              background: isPlaying ? '#3399ff' : '#0066cc',
              minWidth: '50px'
            }}
          >
            {isPlaying ? (
              <Pause size={16} style={{ display: 'inline' }} />
            ) : (
              <Play size={16} style={{ display: 'inline' }} />
            )}
          </button>
          <button 
            className="btn"
            onClick={handleNext}
            title={language === 'ko' ? "다음곡" : "Next"}
          >
            <SkipForward size={16} style={{ display: 'inline' }} />
          </button>
        </div>

        {/* Status */}
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: isPlaying ? '#0066cc' : '#999',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>
          {isPlaying ? t.playing : t.paused}
        </div>

        {/* Volume Control */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '15px',
          padding: '10px',
          background: '#f5f5f5',
          borderRadius: '3px'
        }}>
          <Volume2 size={14} style={{ color: '#0066cc' }} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
            style={{
              flex: 1,
              height: '4px',
              cursor: 'pointer'
            }}
          />
          <span style={{ fontSize: '10px', color: '#666', minWidth: '30px' }}>{volume}%</span>
        </div>

        {/* Playlist */}
        <div style={{ marginBottom: '10px', fontSize: '12px', fontWeight: 'bold', color: '#0066cc' }}>
          {t.playlist}
        </div>
        <div className="playlist">
          {playlist.map((track, idx) => (
            <div 
              key={track.id}
              className={`playlist-item ${idx === currentTrack ? 'playing' : ''}`}
              onClick={() => handleTrackClick(idx)}
              style={{ cursor: 'pointer' }}
            >
              <span style={{ display: 'inline-block', minWidth: '20px' }}>
                {idx === currentTrack && isPlaying ? '▶' : '♪'}
              </span>
              {' '}{track.title}
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        marginTop: '20px',
        padding: '12px',
        background: '#f0f8ff',
        border: '1px solid #3399ff',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center'
      }}>
        {t.hint}
      </div>
    </section>
  );
}

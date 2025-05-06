import React, { useState } from 'react';

const RbbBumnCalculator = () => {
  // Minimum passing scores
  const minScores = {
    sma: {
      tkd: 58
    },
    d3: {
      tkd: 58,
      akhlak: 65,
      twk: 50,
      english: 450,
      learningAgility: 197
    }
  };

  // Stage weights
  const stageWeights = {
    stage1: 0.35,
    stage2: 0.35,
    tkb: 0.40,
    interview: 0.20
  };

  const [educationLevel, setEducationLevel] = useState('sma');
  const [scores, setScores] = useState({
    // Stage 1
    tkd: 0,
    akhlak: 0,
    twk: 0,
    // Stage 2
    english: 0,
    learningAgility: 0,
    // Final stages
    tkb: 0,
    interview: 0
  });

  const [result, setResult] = useState({
    stage1: 0,
    stage2: 0,
    final: 0,
    passedStage1: false,
    passedStage2: false,
    passedFinal: false
  });

  // Update handleInputChange to handle different max values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const maxValue = name === 'english' ? 600 : 
                    name === 'learningAgility' ? 300 :
                    name === 'tkb' ? 300 : 100;
    const numValue = Math.min(maxValue, Math.max(0, Number(value)));
    setScores(prev => ({
      ...prev,
      [name]: numValue
    }));
  };

  // Update calculateScore to handle empty values
  const calculateScore = () => {
    let stage1Score = 0;
    let stage2Score = 0;
    let finalScore = 0;
    let passedStage1 = false;
    let passedStage2 = false;
    let passedFinal = false;

    // Calculate Stage 1
    if (educationLevel === 'sma') {
      if (scores.tkd > 0) {
        stage1Score = scores.tkd;
        passedStage1 = scores.tkd >= minScores.sma.tkd;
      }
    } else {
      if (scores.tkd > 0 && scores.akhlak > 0 && scores.twk > 0) {
        passedStage1 = 
          scores.tkd >= minScores.d3.tkd &&
          scores.akhlak >= minScores.d3.akhlak &&
          scores.twk >= minScores.d3.twk;

        stage1Score = 
          (scores.tkd * 0.4) +
          (scores.akhlak * 0.5) +
          (scores.twk * 0.1);
      }
    }

    // Calculate Stage 2
    if (educationLevel !== 'sma') {
      if (scores.english > 0 && scores.learningAgility > 0) {
        passedStage2 = 
          scores.english >= minScores.d3.english &&
          scores.learningAgility >= minScores.d3.learningAgility;

        stage2Score = 
          (scores.english * 0.8) +
          (scores.learningAgility * 0.2);
      }
    }

    // Calculate Final Score
    if (educationLevel === 'sma' && scores.tkd > 0 && scores.tkb > 0 && scores.interview > 0) {
      finalScore = 
        (stage1Score * stageWeights.stage1) +
        (scores.tkb * stageWeights.tkb) +
        (scores.interview * stageWeights.interview);
      passedFinal = finalScore >= 70;
    } else if (educationLevel !== 'sma' && 
               scores.tkd > 0 && scores.akhlak > 0 && scores.twk > 0 &&
               scores.english > 0 && scores.learningAgility > 0 &&
               scores.tkb > 0 && scores.interview > 0) {
      finalScore = 
        (stage1Score * stageWeights.stage1) +
        (stage2Score * stageWeights.stage2) +
        (scores.tkb * stageWeights.tkb) +
        (scores.interview * stageWeights.interview);
      passedFinal = finalScore >= 70;
    }

    setResult({
      stage1: stage1Score.toFixed(2),
      stage2: stage2Score.toFixed(2),
      final: finalScore.toFixed(2),
      passedStage1,
      passedStage2,
      passedFinal
    });
  };

  // Update the results display section
  return (
    <div className="calculator-container">
      <h2>RBB BUMN 2025 Calculator</h2>
      <div className="calculator-body">
        <div className="calculator-controls">
          <div className="select-group">
            <label>
              Jenjang Pendidikan:
              <select 
                value={educationLevel} 
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option value="sma">SMA/Sederajat</option>
                <option value="d3">D3/D4/S1/S2</option>
              </select>
            </label>
          </div>
        </div>

        <div className="score-inputs">
          {/* Stage 1 Section */}
          <div className="stage-section">
            <h3>Tahap 1</h3>
            <div className="input-group">
              <label>
                Nilai TKD (Tes Kompetensi Dasar)
                <input
                  type="number"
                  name="tkd"
                  value={scores.tkd}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                />
                <span className="weight">
                  Bobot: {educationLevel === 'sma' ? '100%' : '40%'}
                </span>
              </label>
            </div>

            {educationLevel !== 'sma' && (
              <>
                <div className="input-group">
                  <label>
                    Nilai AKHLAK
                    <input
                      type="number"
                      name="akhlak"
                      value={scores.akhlak}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                    />
                    <span className="weight">Bobot: 50%</span>
                  </label>
                </div>

                <div className="input-group">
                  <label>
                    Nilai TWK
                    <input
                      type="number"
                      name="twk"
                      value={scores.twk}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                    />
                    <span className="weight">Bobot: 10%</span>
                  </label>
                </div>
              </>
            )}
          </div>

          {/* Stage 2 Section */}
          {educationLevel !== 'sma' && (
            <div className="stage-section">
              <h3>Tahap 2</h3>
              <div className="input-group">
                <label>
                  Nilai Bahasa Inggris
                  <input
                    type="number"
                    name="english"
                    value={scores.english}
                    onChange={handleInputChange}
                    min="0"
                    max="600"
                  />
                  <span className="weight">Bobot: 80%</span>
                </label>
              </div>
              <div className="input-group">
                <label>
                  Nilai Learning Agility
                  <input
                    type="number"
                    name="learningAgility"
                    value={scores.learningAgility}
                    onChange={handleInputChange}
                    min="0"
                    max="300"
                  />
                  <span className="weight">Bobot: 20%</span>
                </label>
              </div>
            </div>
          )}

          {/* Final Stage Section */}
          <div className="stage-section">
            <h3>Tahap Akhir</h3>
            <div className="input-group">
              <label>
                Nilai TKB
                {/* Update max attribute in TKB input */}
                <input
                  type="number"
                  name="tkb"
                  value={scores.tkb}
                  onChange={handleInputChange}
                  min="0"
                  max="300"
                />
                <span className="weight">Bobot: 40%</span>
              </label>
            </div>
            <div className="input-group">
              <label>
                Nilai Wawancara
                <input
                  type="number"
                  name="interview"
                  value={scores.interview}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                />
                <span className="weight">Bobot: 20%</span>
              </label>
            </div>
          </div>

          <button onClick={calculateScore} className="calculate-btn">
            Hitung Nilai
          </button>
        </div>

        {/* Results Section */}
        <div className="result-section">
          <h3>Hasil Perhitungan</h3>
          <div className="stage-results">
            <p>Nilai Tahap 1: {result.stage1} 
              <span className={result.passedStage1 ? 'passed' : 'failed'}>
                ({result.passedStage1 ? 'Lulus' : 'Tidak Lulus'})
              </span>
            </p>
            {educationLevel !== 'sma' && (
              <p>Nilai Tahap 2: {result.stage2}
                <span className={result.passedStage2 ? 'passed' : 'failed'}>
                  ({result.passedStage2 ? 'Lulus' : 'Tidak Lulus'})
                </span>
              </p>
            )}
            <p>Nilai Akhir: {result.final}
              <span className={result.passedFinal ? 'passed' : 'failed'}>
                ({result.passedFinal ? 'Lulus' : 'Tidak Lulus'})
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RbbBumnCalculator;
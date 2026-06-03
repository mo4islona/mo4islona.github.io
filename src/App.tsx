import { Profile } from './components/Profile';
import { Projects } from './components/Projects';
import { PreviewBackdrop, usePreview } from './preview/PreviewBackdrop';

function App() {
  const { state, show, hide } = usePreview();

  // Shared on-load reveal sequencer: profile renders first and consumes the
  // earliest delays, the project list continues the same cascade afterwards.
  let step = 0;
  const reveal = () => ({ animationDelay: `${step++ * 70}ms` });

  return (
    <>
      <PreviewBackdrop state={state} />
      <main
        className="relative z-10 flex flex-col items-center gap-6 rounded-lg p-5 shadow-2xl sm:flex-row sm:gap-8"
        style={
          state
            ? {
                backgroundColor: 'rgba(24, 26, 25, 0.78)',
                backdropFilter: 'blur(7px)',
              }
            : { backgroundColor: 'var(--color-paper)' }
        }
      >
        <Profile reveal={reveal} />
        <Projects
          activeName={state?.project.name}
          // Nonce of the current hover-triggered frame animation (not idle
          // rotation); changes only when a new preview animation actually fires.
          frameNonce={state?.mode === 'hover' ? state.nonce : undefined}
          onShow={show}
          onHide={hide}
          reveal={reveal}
        />
      </main>
    </>
  );
}

export default App;

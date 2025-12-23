# Headless Game Simulation

A headless, deterministic game simulation engine built in TypeScript. This project demonstrates how to build a reliable, testable core for games and simulations without any UI dependencies.

## What It Does

- **Tick-Based Simulation**: Runs game logic in discrete time steps independent of real-time
- **Deterministic Execution**: Same inputs always produce identical outputs - perfect for replays, testing, and networked games
- **Event-Driven Architecture**: Processes scheduled events and player inputs in a predictable order
- **ECS Pattern**: Entities composed of data-only components processed by pure systems
- **State Serialization**: Full game state can be saved and restored for replays or save games
- **Event Recording**: Records all events for replay functionality

## Core Systems

- **Spawn System**: Creates new entities with specified components
- **Movement System**: Handles directional movement (NORTH, SOUTH, EAST, WEST)
- **Health System**: Manages healing and health restoration
- **Damage System**: Processes damage events with health clamping

## Key Features

**Deterministic RNG**: Linear congruential generator with seed management  
**Event Scheduling**: Schedule events for future ticks  
**Event Recording & Replay**: Record gameplay for replays  
**Complete Test Coverage**: Unit and integration tests verify determinism  
**JSON Serialization**: Save/load entire game state  

## Running the Project

```bash
# Run the simulation
bun ./index.ts

# Run tests
bun test
```

## Why This Matters

This architecture enables:
- **Networked Games**: Server and clients stay in sync
- **Replays**: Record and playback gameplay exactly
- **Time Travel Debugging**: Step through game state at any tick
- **Automated Testing**: Verify game logic without mocks
- **Save Systems**: Serialize entire game state

## Project Structure

```
src/
  ├── core/           # Simulation tick and systems
  ├── types/          # Type definitions
  ├── data/           # Test data and initial state
  ├── serializers/    # State serialization
  ├── rng/            # Deterministic random number generator
  ├── logger/         # Game event logger
  └── queries/        # Event filtering and replay logic
```

## Technical Highlights

- Pure functions for all game logic
- Immutable state transformations
- No side effects in core systems
- Deterministic by design, not by accident

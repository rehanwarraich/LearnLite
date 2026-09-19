import type { LessonContent, QuizQuestion } from '@/types';

// Version-specific lesson content for all lesson resources.
// Each resource has full, light, and text versions with genuinely different depth.

export const MATH_001_VERSIONS = {
  full: {
    introduction: 'A linear equation in two variables is an equation that can be written in the form ax + by = c, where a, b, and c are constants. When graphed, it always produces a straight line. Understanding linear equations is essential for algebra, physics, economics, and many other fields.',
    objectives: [
      'Identify and write linear equations in slope-intercept, point-slope, and standard form',
      'Find the slope of a line given two points',
      'Graph a linear equation from its equation',
      'Solve a system of two linear equations',
    ],
    sections: [
      { heading: 'Slope-Intercept Form', body: 'The most common form of a linear equation is y = mx + b, where m is the slope and b is the y-intercept. The slope m tells you how steep the line is: rise over run. A positive slope goes up from left to right; a negative slope goes down from left to right. A slope of zero means a horizontal line.' },
      { heading: 'Point-Slope Form', body: 'When you know a point (x1, y1) on the line and the slope m, you can write the equation as y - y1 = m(x - x1). This is useful when you do not know the y-intercept directly but you know a point the line passes through.' },
      { heading: 'Standard Form', body: 'The standard form is ax + by = c, where a, b, and c are integers. This form is useful for finding x- and y-intercepts quickly: set y = 0 to find the x-intercept, and set x = 0 to find the y-intercept.' },
      { heading: 'Systems of Linear Equations', body: 'A system of two linear equations has two equations with the same variables. You can solve it by substitution (solve one equation for one variable, substitute into the other) or elimination (add or subtract equations to eliminate a variable). The solution is the point where both lines intersect.' },
    ],
    examples: [
      {
        title: 'Finding the Slope',
        steps: [
          'Given two points: (1, 3) and (4, 9)',
          'Slope m = (y2 - y1) / (x2 - x1) = (9 - 3) / (4 - 1) = 6 / 3 = 2',
          'The slope is 2, meaning the line rises 2 units for every 1 unit it moves right.',
        ],
      },
      {
        title: 'Solving a System by Substitution',
        steps: [
          'Equations: y = 2x + 1 and y = -x + 4',
          'Set them equal: 2x + 1 = -x + 4',
          'Add x to both sides: 3x + 1 = 4',
          'Subtract 1: 3x = 3, so x = 1',
          'Substitute back: y = 2(1) + 1 = 3',
          'Solution: (1, 3)',
        ],
      },
    ],
    key_takeaways: [
      'Slope-intercept form y = mx + b gives slope and y-intercept directly',
      'Slope = rise / run = (y2 - y1) / (x2 - x1)',
      'Systems can be solved by substitution or elimination',
      'The solution to a system is the intersection point of the two lines',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the slope of the line passing through (2, 5) and (6, 13)?', options: ['1', '2', '3', '4'], correct_answer: 1, explanation: 'm = (13 - 5) / (6 - 2) = 8 / 4 = 2' },
      { id: 'q2', question: 'What is the y-intercept of y = 3x - 7?', options: ['3', '-7', '7', '-3'], correct_answer: 1, explanation: 'In y = mx + b, b is the y-intercept. Here b = -7.' },
      { id: 'q3', question: 'Solve the system: y = x + 2 and y = -x + 6. What is x?', options: ['1', '2', '3', '4'], correct_answer: 1, explanation: 'Set equal: x + 2 = -x + 6, so 2x = 4, x = 2. Then y = 4.' },
      { id: 'q4', question: 'Write the equation of a line with slope 3 passing through (0, -2).', options: ['y = 3x + 2', 'y = 3x - 2', 'y = -2x + 3', 'y = 3x'], correct_answer: 1, explanation: 'Slope-intercept form: m = 3, b = -2 (the y-intercept), so y = 3x - 2.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'A linear equation relates two variables in a way that produces a straight line when graphed. The most useful form is y = mx + b, where m is the slope and b is the y-intercept.',
    objectives: [
      'Write linear equations in slope-intercept form',
      'Find the slope given two points',
      'Solve a system of two linear equations',
    ],
    sections: [
      { heading: 'Slope-Intercept Form', body: 'y = mx + b is the most common form. m is the slope (rise over run) and b is the y-intercept (where the line crosses the y-axis). A positive slope goes up left-to-right; a negative slope goes down.' },
      { heading: 'Finding the Slope', body: 'Given two points (x1, y1) and (x2, y2), the slope is m = (y2 - y1) / (x2 - x1). For example, the slope between (1, 3) and (4, 9) is (9-3)/(4-1) = 6/3 = 2.' },
      { heading: 'Solving Systems', body: 'A system of two linear equations can be solved by substitution: solve one equation for a variable, then substitute into the other. The solution is the intersection point of the two lines.' },
    ],
    examples: [
      {
        title: 'Solving a System by Substitution',
        steps: [
          'Equations: y = 2x + 1 and y = -x + 4',
          'Set equal: 2x + 1 = -x + 4',
          'Solve: 3x = 3, x = 1, then y = 3',
          'Solution: (1, 3)',
        ],
      },
    ],
    key_takeaways: [
      'y = mx + b gives slope and y-intercept directly',
      'Slope = (y2 - y1) / (x2 - x1)',
      'Systems can be solved by substitution',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the slope of the line passing through (2, 5) and (6, 13)?', options: ['1', '2', '3', '4'], correct_answer: 1, explanation: 'm = (13 - 5) / (6 - 2) = 8 / 4 = 2' },
      { id: 'q2', question: 'What is the y-intercept of y = 3x - 7?', options: ['3', '-7', '7', '-3'], correct_answer: 1, explanation: 'In y = mx + b, b is the y-intercept. Here b = -7.' },
      { id: 'q3', question: 'Solve the system: y = x + 2 and y = -x + 6. What is x?', options: ['1', '2', '3', '4'], correct_answer: 1, explanation: 'Set equal: x + 2 = -x + 6, so 2x = 4, x = 2.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'A linear equation in two variables can be written as y = mx + b, where m is the slope and b is the y-intercept. When graphed, it produces a straight line.',
    objectives: [
      'Use slope-intercept form y = mx + b',
      'Calculate slope from two points',
    ],
    sections: [
      { heading: 'Key Formulas', body: 'Slope-intercept form: y = mx + b (m = slope, b = y-intercept). Slope formula: m = (y2 - y1) / (x2 - x1). To solve a system, set the two equations equal and solve for one variable.' },
    ],
    examples: [
      {
        title: 'Finding the Slope',
        steps: [
          'Points: (1, 3) and (4, 9)',
          'm = (9 - 3) / (4 - 1) = 6 / 3 = 2',
        ],
      },
    ],
    key_takeaways: [
      'y = mx + b: m is slope, b is y-intercept',
      'Slope = (y2 - y1) / (x2 - x1)',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the slope of the line through (2, 5) and (6, 13)?', options: ['1', '2', '3', '4'], correct_answer: 1, explanation: 'm = (13 - 5) / (6 - 2) = 2' },
      { id: 'q2', question: 'What is the y-intercept of y = 3x - 7?', options: ['3', '-7', '7', '-3'], correct_answer: 1, explanation: 'b = -7 in y = mx + b.' },
    ],
  } as LessonContent,
};

export const MATH_002_VERSIONS = {
  full: {
    introduction: 'A quadratic equation is a second-degree polynomial equation of the form ax^2 + bx + c = 0, where a, b, and c are real numbers and a is not 0. Quadratic equations appear in projectile motion, area calculations, and optimization problems.',
    objectives: [
      'Solve quadratic equations by factoring',
      'Solve quadratic equations by completing the square',
      'Apply the quadratic formula to find solutions',
      'Use the discriminant to predict the number and type of solutions',
    ],
    sections: [
      { heading: 'Factoring', body: 'If the quadratic can be factored into two binomials, set each factor equal to zero and solve. For example, x^2 + 5x + 6 = 0 factors as (x + 2)(x + 3) = 0, giving x = -2 or x = -3.' },
      { heading: 'Completing the Square', body: 'Rewrite the equation in the form (x + p)^2 = q. Move the constant to the right side, add (b/2)^2 to both sides, factor the left side as a perfect square, then take the square root of both sides.' },
      { heading: 'The Quadratic Formula', body: 'For any quadratic ax^2 + bx + c = 0, the solutions are x = (-b plus or minus sqrt(b^2 - 4ac)) / 2a. This formula always works, even when factoring is difficult or impossible.' },
      { heading: 'The Discriminant', body: 'The discriminant D = b^2 - 4ac tells us about the solutions without solving. If D > 0, there are two distinct real solutions. If D = 0, there is one repeated real solution. If D < 0, there are two complex (non-real) solutions.' },
    ],
    examples: [
      {
        title: 'Using the Quadratic Formula',
        steps: [
          'Solve 2x^2 + 3x - 2 = 0',
          'a = 2, b = 3, c = -2',
          'Discriminant: D = 9 - 4(2)(-2) = 9 + 16 = 25',
          'x = (-3 plus or minus sqrt(25)) / 4 = (-3 plus or minus 5) / 4',
          'x = 2/4 = 1/2 or x = -8/4 = -2',
        ],
      },
      {
        title: 'Factoring',
        steps: [
          'Solve x^2 - 7x + 12 = 0',
          'Find two numbers that multiply to 12 and add to -7: -3 and -4',
          'Factor: (x - 3)(x - 4) = 0',
          'Solutions: x = 3 or x = 4',
        ],
      },
    ],
    key_takeaways: [
      'The quadratic formula always works: x = (-b plus or minus sqrt(b^2 - 4ac)) / 2a',
      'The discriminant D = b^2 - 4ac predicts the nature of the solutions',
      'Factoring is the quickest method when it works',
      'Completing the square works for any quadratic and derives the quadratic formula',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the discriminant of x^2 + 4x + 4 = 0?', options: ['0', '8', '16', '-4'], correct_answer: 0, explanation: 'D = 16 - 4(1)(4) = 16 - 16 = 0. One repeated real solution.' },
      { id: 'q2', question: 'Solve x^2 - 5x + 6 = 0.', options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 5'], correct_answer: 1, explanation: 'Factor: (x - 2)(x - 3) = 0, so x = 2 or x = 3.' },
      { id: 'q3', question: 'How many real solutions does x^2 + 1 = 0 have?', options: ['0', '1', '2', 'Infinite'], correct_answer: 0, explanation: 'D = 0 - 4(1)(1) = -4 < 0, so there are no real solutions (two complex solutions).' },
      { id: 'q4', question: 'Using the quadratic formula, solve 2x^2 + 3x - 2 = 0. What are the solutions?', options: ['x = 1/2, x = -2', 'x = 2, x = -1/2', 'x = 1, x = -2', 'x = -1, x = 2'], correct_answer: 0, explanation: 'x = (-3 plus or minus 5) / 4, giving x = 1/2 or x = -2.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'A quadratic equation has the form ax^2 + bx + c = 0. You can solve it by factoring, completing the square, or using the quadratic formula.',
    objectives: [
      'Solve quadratic equations by factoring',
      'Apply the quadratic formula',
      'Use the discriminant to predict solution types',
    ],
    sections: [
      { heading: 'Factoring', body: 'If the quadratic factors into two binomials, set each equal to zero. Example: x^2 + 5x + 6 = (x + 2)(x + 3) = 0, so x = -2 or x = -3.' },
      { heading: 'The Quadratic Formula', body: 'x = (-b plus or minus sqrt(b^2 - 4ac)) / 2a. This always works. The discriminant D = b^2 - 4ac tells you: D > 0 means two real solutions, D = 0 means one, D < 0 means no real solutions.' },
    ],
    examples: [
      {
        title: 'Using the Quadratic Formula',
        steps: [
          'Solve 2x^2 + 3x - 2 = 0 (a=2, b=3, c=-2)',
          'D = 9 + 16 = 25',
          'x = (-3 plus or minus 5) / 4',
          'x = 1/2 or x = -2',
        ],
      },
    ],
    key_takeaways: [
      'Quadratic formula: x = (-b plus or minus sqrt(b^2 - 4ac)) / 2a',
      'D > 0: two real solutions; D = 0: one; D < 0: none',
      'Factoring is fastest when it works',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the discriminant of x^2 + 4x + 4 = 0?', options: ['0', '8', '16', '-4'], correct_answer: 0, explanation: 'D = 16 - 16 = 0. One repeated real solution.' },
      { id: 'q2', question: 'Solve x^2 - 5x + 6 = 0.', options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 5'], correct_answer: 1, explanation: '(x - 2)(x - 3) = 0, so x = 2 or x = 3.' },
      { id: 'q3', question: 'How many real solutions does x^2 + 1 = 0 have?', options: ['0', '1', '2', 'Infinite'], correct_answer: 0, explanation: 'D = -4 < 0, so no real solutions.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'A quadratic equation has the form ax^2 + bx + c = 0. The quadratic formula solves any quadratic equation.',
    objectives: [
      'Use the quadratic formula',
      'Interpret the discriminant',
    ],
    sections: [
      { heading: 'Key Formulas', body: 'Quadratic formula: x = (-b plus or minus sqrt(b^2 - 4ac)) / 2a. Discriminant: D = b^2 - 4ac. D > 0: two real solutions. D = 0: one real solution. D < 0: no real solutions. Factoring example: x^2 - 5x + 6 = (x-2)(x-3) = 0, so x = 2 or x = 3.' },
    ],
    examples: [
      {
        title: 'Quadratic Formula',
        steps: [
          'Solve 2x^2 + 3x - 2 = 0',
          'x = (-3 plus or minus 5) / 4',
          'x = 1/2 or x = -2',
        ],
      },
    ],
    key_takeaways: [
      'x = (-b plus or minus sqrt(b^2 - 4ac)) / 2a',
      'D = b^2 - 4ac predicts the number of real solutions',
    ],
    practice_questions: [
      { id: 'q1', question: 'Solve x^2 - 5x + 6 = 0.', options: ['x = 1, x = 6', 'x = 2, x = 3', 'x = -2, x = -3', 'x = 1, x = 5'], correct_answer: 1, explanation: '(x-2)(x-3) = 0, so x = 2 or 3.' },
      { id: 'q2', question: 'How many real solutions does x^2 + 1 = 0 have?', options: ['0', '1', '2', 'Infinite'], correct_answer: 0, explanation: 'D = -4 < 0, no real solutions.' },
    ],
  } as LessonContent,
};

export const PHY_001_VERSIONS = {
  full: {
    introduction: 'Sir Isaac Newton\'s three laws of motion describe the relationship between a body and the forces acting upon it. These laws form the foundation of classical mechanics and explain everything from a ball rolling down a hill to planets orbiting the sun.',
    objectives: [
      'State and explain each of Newton\'s three laws of motion',
      'Apply F = ma to calculate force, mass, or acceleration',
      'Identify action-reaction pairs in real-world scenarios',
      'Distinguish between mass and weight',
    ],
    sections: [
      { heading: 'First Law (Law of Inertia)', body: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced external force. Objects resist changes to their state of motion. The more massive an object, the more it resists acceleration.' },
      { heading: 'Second Law (F = ma)', body: 'The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma, where F is force in newtons (N), m is mass in kilograms (kg), and a is acceleration in m/s^2. A larger force produces more acceleration; a larger mass produces less acceleration for the same force.' },
      { heading: 'Third Law (Action-Reaction)', body: 'For every action, there is an equal and opposite reaction. When you push on a wall with 50 N, the wall pushes back on you with 50 N. The forces are equal in magnitude, opposite in direction, and act on different objects.' },
      { heading: 'Mass vs. Weight', body: 'Mass is the amount of matter in an object (measured in kg) and does not change with location. Weight is the gravitational force on an object (W = mg) and does change with location. On the Moon, your mass is the same but your weight is about 1/6 of your weight on Earth.' },
    ],
    examples: [
      {
        title: 'Calculating Force',
        steps: [
          'A 2 kg box accelerates at 3 m/s^2. What force is needed?',
          'F = ma = (2 kg)(3 m/s^2) = 6 N',
          'A force of 6 newtons is required.',
        ],
      },
      {
        title: 'Action-Reaction Pair',
        steps: [
          'A swimmer pushes water backward with 80 N of force.',
          'By Newton\'s third law, the water pushes the swimmer forward with 80 N.',
          'The swimmer accelerates forward; the water accelerates backward.',
          'The forces are equal (80 N each) but act on different objects.',
        ],
      },
      {
        title: 'Mass vs. Weight on the Moon',
        steps: [
          'An astronaut has mass 70 kg on Earth.',
          'Mass on the Moon is still 70 kg (mass does not change).',
          'Weight on Earth: W = mg = 70 * 9.8 = 686 N',
          'Weight on Moon: W = 70 * 1.6 = 112 N (about 1/6 of Earth weight)',
        ],
      },
    ],
    key_takeaways: [
      'First Law: Objects resist changes to their motion (inertia)',
      'Second Law: F = ma — force equals mass times acceleration',
      'Third Law: Every force has an equal and opposite reaction force',
      'Mass is constant; weight depends on gravity (W = mg)',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the acceleration of a 5 kg object under a 20 N force?', options: ['2 m/s^2', '4 m/s^2', '5 m/s^2', '100 m/s^2'], correct_answer: 1, explanation: 'a = F/m = 20/5 = 4 m/s^2' },
      { id: 'q2', question: 'A book sits on a table. What is the reaction force to the book\'s weight (gravity pulling down)?', options: ['The table pushing up on the book', 'The book pulling Earth up', 'The table pushing down on the floor', 'There is no reaction force'], correct_answer: 1, explanation: 'The action is Earth pulling the book down; the reaction is the book pulling Earth up. The table\'s normal force is a separate force on the book.' },
      { id: 'q3', question: 'If the net force on an object is zero, what happens to its motion?', options: ['It stops immediately', 'It continues at constant velocity', 'It accelerates', 'It decelerates slowly'], correct_answer: 1, explanation: 'By Newton\'s first law, zero net force means no acceleration — the object moves at constant velocity (which includes being at rest).' },
      { id: 'q4', question: 'An astronaut has mass 80 kg. What is their weight on the Moon (g = 1.6 m/s^2)?', options: ['128 N', '784 N', '80 N', '12.8 N'], correct_answer: 0, explanation: 'W = mg = 80 * 1.6 = 128 N. Mass stays 80 kg, but weight changes with gravity.' },
      { id: 'q5', question: 'A 1500 kg car decelerates at 5 m/s^2. What net force is acting on it?', options: ['300 N', '7500 N', '3000 N', '150 N'], correct_answer: 1, explanation: 'F = ma = 1500 * 5 = 7500 N. The force opposes the direction of motion (deceleration).' },
    ],
  } as LessonContent,
  light: {
    introduction: 'Newton\'s three laws of motion describe how forces affect the motion of objects. They are the foundation of classical mechanics.',
    objectives: [
      'State Newton\'s three laws',
      'Apply F = ma to solve problems',
      'Identify action-reaction pairs',
    ],
    sections: [
      { heading: 'The Three Laws', body: 'First Law (Inertia): An object at rest stays at rest, and an object in motion stays in motion, unless acted on by a net force. Second Law: F = ma — acceleration is proportional to net force and inversely proportional to mass. Third Law: For every action there is an equal and opposite reaction.' },
      { heading: 'Mass vs. Weight', body: 'Mass (kg) is the amount of matter — it does not change with location. Weight (W = mg) is the gravitational force — it changes with gravity. On the Moon, mass is the same but weight is about 1/6 of Earth weight.' },
    ],
    examples: [
      {
        title: 'Calculating Force',
        steps: [
          'A 2 kg box accelerates at 3 m/s^2',
          'F = ma = 2 * 3 = 6 N',
        ],
      },
      {
        title: 'Action-Reaction',
        steps: [
          'A swimmer pushes water backward with 80 N',
          'Water pushes the swimmer forward with 80 N',
          'Equal forces, opposite directions, on different objects',
        ],
      },
    ],
    key_takeaways: [
      'First Law: Objects resist changes to motion (inertia)',
      'Second Law: F = ma',
      'Third Law: Equal and opposite reaction forces',
      'Mass is constant; weight depends on gravity (W = mg)',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the acceleration of a 5 kg object under a 20 N force?', options: ['2 m/s^2', '4 m/s^2', '5 m/s^2', '100 m/s^2'], correct_answer: 1, explanation: 'a = F/m = 20/5 = 4 m/s^2' },
      { id: 'q2', question: 'If the net force on an object is zero, what happens to its motion?', options: ['It stops immediately', 'It continues at constant velocity', 'It accelerates', 'It decelerates slowly'], correct_answer: 1, explanation: 'Zero net force means no acceleration — constant velocity (or rest).' },
      { id: 'q3', question: 'An astronaut has mass 80 kg. What is their weight on the Moon (g = 1.6 m/s^2)?', options: ['128 N', '784 N', '80 N', '12.8 N'], correct_answer: 0, explanation: 'W = mg = 80 * 1.6 = 128 N.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'Newton\'s three laws describe how forces affect motion: inertia, F = ma, and action-reaction.',
    objectives: [
      'State Newton\'s three laws',
      'Apply F = ma',
    ],
    sections: [
      { heading: 'The Three Laws', body: '1) Inertia: Objects resist changes to their motion unless a net force acts. 2) F = ma: Force equals mass times acceleration. 3) Action-Reaction: Every force has an equal and opposite reaction. Mass (kg) is constant; Weight (N) = mg changes with gravity.' },
    ],
    examples: [
      {
        title: 'Calculating Force',
        steps: [
          'A 2 kg box accelerates at 3 m/s^2',
          'F = ma = 2 * 3 = 6 N',
        ],
      },
    ],
    key_takeaways: [
      'F = ma',
      'Every action has an equal and opposite reaction',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the acceleration of a 5 kg object under a 20 N force?', options: ['2 m/s^2', '4 m/s^2', '5 m/s^2', '100 m/s^2'], correct_answer: 1, explanation: 'a = F/m = 20/5 = 4 m/s^2' },
      { id: 'q2', question: 'If the net force on an object is zero, what happens?', options: ['It stops immediately', 'It continues at constant velocity', 'It accelerates', 'It decelerates'], correct_answer: 1, explanation: 'Zero net force means constant velocity (or rest).' },
    ],
  } as LessonContent,
};

export const PHY_002_VERSIONS = {
  full: {
    introduction: 'Kinematics is the branch of physics that describes motion without considering its causes. We use displacement, velocity, acceleration, and time to describe how objects move in one dimension (along a straight line).',
    objectives: [
      'Define displacement, velocity, and acceleration',
      'Use the four kinematic equations to solve motion problems',
      'Interpret position-time and velocity-time graphs',
      'Distinguish between average and instantaneous velocity',
    ],
    sections: [
      { heading: 'Key Definitions', body: 'Displacement (delta x) is the change in position — a vector with direction. Velocity (v) is the rate of change of displacement (m/s). Acceleration (a) is the rate of change of velocity (m/s^2). Speed is the magnitude of velocity (a scalar).' },
      { heading: 'The Four Kinematic Equations', body: '1) v = v0 + at  2) delta x = v0*t + (1/2)at^2  3) v^2 = v0^2 + 2a(delta x)  4) delta x = (1/2)(v + v0)t. These equations apply when acceleration is constant. Choose the equation based on which variables you know and which you need.' },
      { heading: 'Free Fall', body: 'When an object falls under gravity (ignoring air resistance), acceleration is g = 9.8 m/s^2 downward. Use the kinematic equations with a = -9.8 m/s^2 (if up is positive). At the highest point of a toss, velocity is zero but acceleration is still g.' },
      { heading: 'Average vs. Instantaneous Velocity', body: 'Average velocity = total displacement / total time. Instantaneous velocity is the velocity at a specific moment — the slope of the position-time graph at that point. On a velocity-time graph, the slope gives acceleration and the area under the curve gives displacement.' },
    ],
    examples: [
      {
        title: 'Finding Final Velocity',
        steps: [
          'A car starts from rest (v0 = 0) and accelerates at 4 m/s^2 for 5 seconds.',
          'Using v = v0 + at = 0 + (4)(5) = 20 m/s',
          'The final velocity is 20 m/s.',
        ],
      },
      {
        title: 'Free Fall Problem',
        steps: [
          'A ball is dropped from a 45 m cliff. How long until it hits the ground?',
          'delta x = 45 m, v0 = 0, a = 9.8 m/s^2',
          'Use delta x = v0*t + (1/2)at^2: 45 = 0 + 4.9t^2',
          't^2 = 9.18, so t = 3.03 seconds',
        ],
      },
      {
        title: 'Finding Displacement',
        steps: [
          'A train slows from 30 m/s to 10 m/s with acceleration -2 m/s^2.',
          'Use v^2 = v0^2 + 2a(delta x): 100 = 900 + 2(-2)(delta x)',
          '100 = 900 - 4(delta x), so 4(delta x) = 800',
          'delta x = 200 m',
        ],
      },
    ],
    key_takeaways: [
      'The four kinematic equations apply only when acceleration is constant',
      'Displacement and velocity are vectors — direction matters',
      'In free fall, a = g = 9.8 m/s^2 (ignoring air resistance)',
      'At the peak of a throw, velocity is zero but acceleration is still g',
    ],
    practice_questions: [
      { id: 'q1', question: 'A car accelerates from rest at 3 m/s^2 for 4 seconds. What is its final velocity?', options: ['7 m/s', '12 m/s', '24 m/s', '48 m/s'], correct_answer: 1, explanation: 'v = v0 + at = 0 + (3)(4) = 12 m/s' },
      { id: 'q2', question: 'An object is dropped from rest. How far does it fall in 2 seconds? (g = 9.8 m/s^2)', options: ['9.8 m', '19.6 m', '39.2 m', '4.9 m'], correct_answer: 1, explanation: 'delta x = (1/2)gt^2 = (1/2)(9.8)(4) = 19.6 m' },
      { id: 'q3', question: 'At the highest point of a ball thrown straight up, what is its acceleration?', options: ['0 m/s^2', '9.8 m/s^2 downward', '9.8 m/s^2 upward', 'It depends on the throw speed'], correct_answer: 1, explanation: 'Acceleration due to gravity is always 9.8 m/s^2 downward near Earth\'s surface, even at the peak where velocity is zero.' },
      { id: 'q4', question: 'A train slows from 30 m/s to 10 m/s with a = -2 m/s^2. How far does it travel?', options: ['100 m', '200 m', '400 m', '50 m'], correct_answer: 1, explanation: 'v^2 = v0^2 + 2a(delta x): 100 = 900 - 4(delta x), so delta x = 200 m' },
    ],
  } as LessonContent,
  light: {
    introduction: 'Kinematics describes motion using displacement, velocity, acceleration, and time. The four kinematic equations apply when acceleration is constant.',
    objectives: [
      'Define displacement, velocity, and acceleration',
      'Use kinematic equations to solve problems',
      'Understand free fall',
    ],
    sections: [
      { heading: 'The Four Kinematic Equations', body: '1) v = v0 + at  2) delta x = v0*t + (1/2)at^2  3) v^2 = v0^2 + 2a(delta x)  4) delta x = (1/2)(v + v0)t. Choose the equation based on which variables you know. These apply only when acceleration is constant.' },
      { heading: 'Free Fall', body: 'In free fall (ignoring air resistance), a = g = 9.8 m/s^2 downward. At the peak of a toss, velocity is zero but acceleration is still g. Displacement and velocity are vectors — direction matters.' },
    ],
    examples: [
      {
        title: 'Finding Final Velocity',
        steps: [
          'A car starts from rest, accelerates at 4 m/s^2 for 5 s',
          'v = v0 + at = 0 + 4(5) = 20 m/s',
        ],
      },
      {
        title: 'Free Fall',
        steps: [
          'Ball dropped from 45 m cliff, v0 = 0, a = 9.8',
          '45 = 4.9t^2, so t = 3.03 s',
        ],
      },
    ],
    key_takeaways: [
      'Kinematic equations apply only when acceleration is constant',
      'In free fall, a = 9.8 m/s^2 downward',
      'At the peak of a throw, velocity is zero but acceleration is still g',
    ],
    practice_questions: [
      { id: 'q1', question: 'A car accelerates from rest at 3 m/s^2 for 4 seconds. What is its final velocity?', options: ['7 m/s', '12 m/s', '24 m/s', '48 m/s'], correct_answer: 1, explanation: 'v = 0 + (3)(4) = 12 m/s' },
      { id: 'q2', question: 'An object is dropped from rest. How far does it fall in 2 seconds? (g = 9.8)', options: ['9.8 m', '19.6 m', '39.2 m', '4.9 m'], correct_answer: 1, explanation: 'delta x = (1/2)(9.8)(4) = 19.6 m' },
      { id: 'q3', question: 'At the highest point of a ball thrown straight up, what is its acceleration?', options: ['0 m/s^2', '9.8 m/s^2 downward', '9.8 m/s^2 upward', 'Depends on throw speed'], correct_answer: 1, explanation: 'Gravity always accelerates at 9.8 m/s^2 downward near Earth.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'Kinematics describes motion using displacement, velocity, and acceleration. The four kinematic equations apply when acceleration is constant.',
    objectives: [
      'Use kinematic equations',
    ],
    sections: [
      { heading: 'Key Equations', body: '1) v = v0 + at  2) delta x = v0*t + (1/2)at^2  3) v^2 = v0^2 + 2a(delta x)  4) delta x = (1/2)(v + v0)t. Free fall: a = g = 9.8 m/s^2. At the peak of a toss, velocity is zero but acceleration is still g.' },
    ],
    examples: [
      {
        title: 'Final Velocity',
        steps: [
          'Car from rest, a = 4 m/s^2, t = 5 s',
          'v = 0 + 4(5) = 20 m/s',
        ],
      },
    ],
    key_takeaways: [
      'Kinematic equations require constant acceleration',
      'Free fall: a = 9.8 m/s^2',
    ],
    practice_questions: [
      { id: 'q1', question: 'A car accelerates from rest at 3 m/s^2 for 4 s. Final velocity?', options: ['7 m/s', '12 m/s', '24 m/s', '48 m/s'], correct_answer: 1, explanation: 'v = 0 + 3(4) = 12 m/s' },
      { id: 'q2', question: 'Object dropped from rest. How far in 2 s? (g = 9.8)', options: ['9.8 m', '19.6 m', '39.2 m', '4.9 m'], correct_answer: 1, explanation: 'delta x = (1/2)(9.8)(4) = 19.6 m' },
    ],
  } as LessonContent,
};

export const CS_001_VERSIONS = {
  full: {
    introduction: 'Variables are the fundamental building blocks of programming. A variable is a named location in memory that stores a value. Every variable has a data type that determines what kind of data it can hold and what operations can be performed on it.',
    objectives: [
      'Declare and assign variables in a programming language',
      'Identify and use common data types: int, float, string, boolean',
      'Understand type conversion and casting',
      'Use arrays to store multiple values',
    ],
    sections: [
      { heading: 'What is a Variable?', body: 'A variable is a named container for a value. Think of it like a labeled box: you put a value in, and later you can look at it or change it by using the label (the variable name). In most languages, you declare a variable by giving it a name and a type, then assign a value with the = operator.' },
      { heading: 'Common Data Types', body: 'Integer (int): whole numbers like 3, -7, 42. Float/double: decimal numbers like 3.14, -0.5. String: text enclosed in quotes like "hello". Boolean (bool): true or false. These are the primitive types found in most languages.' },
      { heading: 'Type Conversion', body: 'Sometimes you need to convert between types. Converting an int to a float is safe (widening). Converting a float to an int may lose data (narrowing) — the decimal part is truncated. Converting a string to a number requires parsing; if the string is not a valid number, it causes an error.' },
      { heading: 'Arrays', body: 'An array stores multiple values of the same type in a single variable. Elements are accessed by index, starting at 0. For example, nums = [10, 20, 30] — nums[0] is 10, nums[1] is 20, nums[2] is 30. The length of this array is 3.' },
    ],
    examples: [
      {
        title: 'Declaring Variables',
        steps: [
          'age = 16          // integer',
          'price = 9.99      // float',
          'name = "Alice"    // string',
          'is_active = true  // boolean',
          'scores = [85, 90, 78]  // array of integers',
        ],
      },
      {
        title: 'Type Conversion',
        steps: [
          'int x = 5;',
          'float y = (float)x;   // y = 5.0 (widening, safe)',
          'float z = 3.99;',
          'int w = (int)z;       // w = 3 (narrowing, decimal lost)',
          'String s = "42";',
          'int n = Integer.parseInt(s);  // n = 42 (parsing)',
        ],
      },
    ],
    key_takeaways: [
      'Variables are named memory locations that store values',
      'Common types: int, float, string, boolean, array',
      'Widening conversions (int to float) are safe; narrowing may lose data',
      'Array indices start at 0',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the value of nums[2] if nums = [10, 20, 30, 40]?', options: ['10', '20', '30', '40'], correct_answer: 2, explanation: 'Array indices start at 0, so nums[0]=10, nums[1]=20, nums[2]=30.' },
      { id: 'q2', question: 'Which data type would you use to store a yes/no value?', options: ['int', 'float', 'string', 'boolean'], correct_answer: 3, explanation: 'Boolean stores only true or false, perfect for yes/no values.' },
      { id: 'q3', question: 'What happens when you convert the float 3.7 to an int?', options: ['It becomes 3.0', 'It becomes 4', 'It becomes 3', 'It causes an error'], correct_answer: 2, explanation: 'Converting float to int truncates the decimal part, so 3.7 becomes 3 (not rounded).' },
      { id: 'q4', question: 'Which is a widening conversion?', options: ['float to int', 'int to float', 'string to int', 'int to boolean'], correct_answer: 1, explanation: 'Converting int to float is widening — no data is lost because floats can represent all integers.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'Variables are named containers for storing data. Each variable has a data type that determines what kind of data it can hold.',
    objectives: [
      'Declare and assign variables',
      'Identify common data types',
      'Understand type conversion',
    ],
    sections: [
      { heading: 'Variables and Data Types', body: 'A variable is a named container for a value. Common types: int (whole numbers), float (decimals), string (text), boolean (true/false). Assign with the = operator. Example: age = 16 (int), name = "Alice" (string).' },
      { heading: 'Type Conversion', body: 'Converting int to float is safe (widening). Converting float to int loses the decimal (narrowing). Converting string to number requires parsing — if invalid, it causes an error.' },
      { heading: 'Arrays', body: 'Arrays store multiple values of the same type. Elements are accessed by index starting at 0. nums = [10, 20, 30] — nums[0] is 10, nums[2] is 30.' },
    ],
    examples: [
      {
        title: 'Declaring Variables',
        steps: [
          'age = 16          // integer',
          'price = 9.99      // float',
          'name = "Alice"    // string',
          'is_active = true  // boolean',
        ],
      },
    ],
    key_takeaways: [
      'Variables are named memory locations',
      'Common types: int, float, string, boolean, array',
      'Array indices start at 0',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is the value of nums[2] if nums = [10, 20, 30, 40]?', options: ['10', '20', '30', '40'], correct_answer: 2, explanation: 'Indices start at 0: nums[2] = 30.' },
      { id: 'q2', question: 'Which data type for a yes/no value?', options: ['int', 'float', 'string', 'boolean'], correct_answer: 3, explanation: 'Boolean stores true or false.' },
      { id: 'q3', question: 'What happens when you convert float 3.7 to int?', options: ['3.0', '4', '3', 'Error'], correct_answer: 2, explanation: 'Truncation: 3.7 becomes 3.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'Variables store data. Common types: int, float, string, boolean, array.',
    objectives: [
      'Identify common data types',
    ],
    sections: [
      { heading: 'Key Concepts', body: 'int: whole numbers. float: decimals. string: text in quotes. boolean: true/false. Array: ordered list, index starts at 0. Type conversion: int to float is safe (widening); float to int loses decimals (narrowing).' },
    ],
    examples: [
      {
        title: 'Variable Declaration',
        steps: [
          'age = 16       // int',
          'name = "Alice" // string',
          'nums = [10, 20] // array, nums[0] = 10',
        ],
      },
    ],
    key_takeaways: [
      'Common types: int, float, string, boolean, array',
      'Array indices start at 0',
    ],
    practice_questions: [
      { id: 'q1', question: 'What is nums[2] if nums = [10, 20, 30, 40]?', options: ['10', '20', '30', '40'], correct_answer: 2, explanation: 'Index 0: nums[2] = 30.' },
      { id: 'q2', question: 'Which type for yes/no?', options: ['int', 'float', 'string', 'boolean'], correct_answer: 3, explanation: 'Boolean = true/false.' },
    ],
  } as LessonContent,
};

export const CS_002_VERSIONS = {
  full: {
    introduction: 'Loops are one of the most powerful concepts in programming. They let you run a block of code repeatedly without writing it out each time. This is essential for tasks like processing every item in a list, repeating a calculation, or waiting for a condition to be met.',
    objectives: [
      'Write and understand for loops',
      'Write and understand while loops',
      'Use break and continue to control loop execution',
      'Choose the right loop type for a given problem',
    ],
    sections: [
      { heading: 'For Loops', body: 'A for loop runs a specific number of times. It has three parts: initialization, condition, and update. Example: for (int i = 0; i < 5; i++) { ... } — this runs 5 times with i going from 0 to 4. For loops are ideal when you know how many iterations you need.' },
      { heading: 'While Loops', body: 'A while loop runs as long as a condition is true. Example: while (x < 10) { x++; }. While loops are ideal when you do not know how many iterations you need — you just know when to stop. Be careful: if the condition never becomes false, you get an infinite loop.' },
      { heading: 'Break and Continue', body: 'The break statement exits the loop immediately, skipping any remaining iterations. The continue statement skips the rest of the current iteration and moves to the next one. Both work in for and while loops.' },
      { heading: 'Choosing the Right Loop', body: 'Use a for loop when you know the exact number of iterations (e.g., processing each element of an array). Use a while loop when the number of iterations depends on a condition that changes during execution (e.g., reading input until a sentinel value).' },
    ],
    examples: [
      {
        title: 'For Loop: Sum 1 to 5',
        steps: [
          'sum = 0',
          'for (int i = 1; i <= 5; i++) {',
          '    sum = sum + i;',
          '}',
          'Iteration 1: sum = 0 + 1 = 1',
          'Iteration 2: sum = 1 + 2 = 3',
          'Iteration 3: sum = 3 + 3 = 6',
          'Iteration 4: sum = 6 + 4 = 10',
          'Iteration 5: sum = 10 + 5 = 15',
          'Result: sum = 15',
        ],
      },
      {
        title: 'While Loop with Break',
        steps: [
          'int n = 0;',
          'while (true) {',
          '    if (n >= 3) break;',
          '    n++;',
          '}',
          'The loop runs until n reaches 3, then break exits.',
          'Result: n = 3',
        ],
      },
    ],
    key_takeaways: [
      'For loops run a known number of times; while loops run until a condition is false',
      'break exits a loop entirely; continue skips to the next iteration',
      'Always ensure a while loop\'s condition can become false to avoid infinite loops',
      'Choose for loops for counted iterations, while loops for conditional ones',
    ],
    practice_questions: [
      { id: 'q1', question: 'How many times does this loop run? for (int i = 0; i < 10; i++)', options: ['9', '10', '11', 'Infinite'], correct_answer: 1, explanation: 'i goes from 0 to 9, which is 10 iterations.' },
      { id: 'q2', question: 'What does the break statement do?', options: ['Skips the current iteration', 'Exits the loop entirely', 'Pauses the loop', 'Restarts the loop'], correct_answer: 1, explanation: 'break immediately exits the loop, skipping all remaining iterations.' },
      { id: 'q3', question: 'What is the value of sum after: for (int i = 1; i <= 3; i++) sum += i;', options: ['3', '5', '6', '7'], correct_answer: 2, explanation: 'sum = 1 + 2 + 3 = 6' },
      { id: 'q4', question: 'What does continue do in a loop?', options: ['Exits the loop', 'Skips to the next iteration', 'Restarts the loop', 'Pauses execution'], correct_answer: 1, explanation: 'continue skips the rest of the current iteration and moves to the next one.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'Loops let you repeat code multiple times. For loops run a known number of times; while loops run until a condition becomes false.',
    objectives: [
      'Write for and while loops',
      'Use break and continue',
      'Choose the right loop type',
    ],
    sections: [
      { heading: 'For and While Loops', body: 'For loop: for (int i = 0; i < 5; i++) runs 5 times. While loop: while (x < 10) { x++; } runs until x reaches 10. Use for loops when you know the count; while loops when you know the stopping condition. If the while condition never becomes false, you get an infinite loop.' },
      { heading: 'Break and Continue', body: 'break exits the loop entirely. continue skips the rest of the current iteration and moves to the next one. Both work in for and while loops.' },
    ],
    examples: [
      {
        title: 'For Loop: Sum 1 to 5',
        steps: [
          'sum = 0',
          'for (int i = 1; i <= 5; i++) sum += i',
          'sum = 1+2+3+4+5 = 15',
        ],
      },
    ],
    key_takeaways: [
      'For loops: known count. While loops: known condition.',
      'break exits the loop; continue skips to next iteration',
      'Avoid infinite loops: ensure while conditions can become false',
    ],
    practice_questions: [
      { id: 'q1', question: 'How many times does for (int i = 0; i < 10; i++) run?', options: ['9', '10', '11', 'Infinite'], correct_answer: 1, explanation: 'i goes 0 to 9 = 10 iterations.' },
      { id: 'q2', question: 'What does break do?', options: ['Skips current iteration', 'Exits the loop', 'Pauses the loop', 'Restarts'], correct_answer: 1, explanation: 'break exits the loop entirely.' },
      { id: 'q3', question: 'What is sum after: for (int i = 1; i <= 3; i++) sum += i;', options: ['3', '5', '6', '7'], correct_answer: 2, explanation: '1 + 2 + 3 = 6.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'Loops repeat code. For loops run a known count; while loops run until a condition is false.',
    objectives: [
      'Understand for and while loops',
    ],
    sections: [
      { heading: 'Key Concepts', body: 'For loop: for (i = 0; i < n; i++) runs n times. While loop: while (condition) runs until condition is false. break exits the loop. continue skips to the next iteration. Avoid infinite loops: ensure while conditions can become false.' },
    ],
    examples: [
      {
        title: 'For Loop Sum',
        steps: [
          'for (i = 1; i <= 5; i++) sum += i',
          'sum = 1+2+3+4+5 = 15',
        ],
      },
    ],
    key_takeaways: [
      'For: known count. While: known condition.',
      'break exits; continue skips to next iteration.',
    ],
    practice_questions: [
      { id: 'q1', question: 'How many times does for (i = 0; i < 10; i++) run?', options: ['9', '10', '11', 'Infinite'], correct_answer: 1, explanation: '0 to 9 = 10 iterations.' },
      { id: 'q2', question: 'What does break do?', options: ['Skips iteration', 'Exits loop', 'Pauses', 'Restarts'], correct_answer: 1, explanation: 'break exits the loop entirely.' },
    ],
  } as LessonContent,
};

export const ENG_001_VERSIONS = {
  full: {
    introduction: 'Every English sentence is built from words, and every word falls into one of eight categories called parts of speech. Understanding these categories helps you write clearer, more effective sentences and understand how sentences are constructed.',
    objectives: [
      'Identify all eight parts of speech in a sentence',
      'Distinguish between subjects and predicates',
      'Recognize simple, compound, and complex sentences',
      'Construct well-formed sentences using correct parts of speech',
    ],
    sections: [
      { heading: 'The Eight Parts of Speech', body: 'Noun: person, place, thing, or idea (dog, city, freedom). Pronoun: replaces a noun (he, she, it, they). Verb: action or state of being (run, is, became). Adjective: describes a noun (tall, blue, happy). Adverb: describes a verb, adjective, or other adverb (quickly, very, well). Preposition: shows relationship (in, on, under, between). Conjunction: connects words or clauses (and, but, because). Interjection: expresses emotion (Wow! Oh!).' },
      { heading: 'Subject and Predicate', body: 'Every complete sentence has a subject (who or what the sentence is about) and a predicate (what the subject does or is). Example: "The cat slept." Subject = "The cat", Predicate = "slept".' },
      { heading: 'Sentence Types', body: 'Simple sentence: one independent clause (The dog barked). Compound sentence: two independent clauses joined by a conjunction (The dog barked, and the cat ran). Complex sentence: one independent clause and one or more dependent clauses (The dog barked because it heard a noise). Compound-complex: combines both types.' },
    ],
    examples: [
      {
        title: 'Identifying Parts of Speech',
        steps: [
          'Sentence: "The quick brown fox jumps over the lazy dog."',
          'The = article (sometimes classed as adjective)',
          'quick, brown = adjectives (describe fox)',
          'fox = noun (subject)',
          'jumps = verb (action)',
          'over = preposition (shows relationship)',
          'the = article',
          'lazy = adjective (describes dog)',
          'dog = noun (object of preposition)',
        ],
      },
      {
        title: 'Sentence Type Identification',
        steps: [
          'Simple: "She opened the door." (one clause)',
          'Compound: "She opened the door, and she walked outside." (two independent clauses joined by "and")',
          'Complex: "When she opened the door, she saw a surprise." (dependent clause + independent clause)',
        ],
      },
    ],
    key_takeaways: [
      'The eight parts of speech: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection',
      'Every complete sentence needs a subject and a predicate',
      'Simple = 1 clause; Compound = 2+ independent clauses; Complex = independent + dependent',
      'Identifying parts of speech helps you understand sentence structure and improve writing',
    ],
    practice_questions: [
      { id: 'q1', question: 'In "She ran quickly," what part of speech is "quickly"?', options: ['Adjective', 'Adverb', 'Verb', 'Noun'], correct_answer: 1, explanation: '"Quickly" describes the verb "ran," so it is an adverb.' },
      { id: 'q2', question: 'What type of sentence is: "I stayed home because it rained."?', options: ['Simple', 'Compound', 'Complex', 'Compound-complex'], correct_answer: 2, explanation: 'It has one independent clause ("I stayed home") and one dependent clause ("because it rained"), making it complex.' },
      { id: 'q3', question: 'Which word is a preposition: "The book is on the table."?', options: ['book', 'is', 'on', 'table'], correct_answer: 2, explanation: '"On" shows the relationship between the book and the table, so it is a preposition.' },
      { id: 'q4', question: 'What is the subject of: "The old man walked slowly down the street."?', options: ['old', 'man', 'walked', 'street'], correct_answer: 1, explanation: 'The subject is "man" (the one doing the walking). "The old" modifies the subject.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'Every English sentence is built from words in eight categories called parts of speech. Understanding them helps you write clearer sentences.',
    objectives: [
      'Identify the eight parts of speech',
      'Distinguish subjects and predicates',
      'Recognize sentence types',
    ],
    sections: [
      { heading: 'The Eight Parts of Speech', body: 'Noun (dog, city), Pronoun (he, they), Verb (run, is), Adjective (tall, blue), Adverb (quickly, very), Preposition (in, on, under), Conjunction (and, but, because), Interjection (Wow!). Every sentence has a subject (who/what) and predicate (does/is).' },
      { heading: 'Sentence Types', body: 'Simple: one clause (The dog barked). Compound: two independent clauses joined by a conjunction (The dog barked, and the cat ran). Complex: independent + dependent clause (The dog barked because it heard a noise).' },
    ],
    examples: [
      {
        title: 'Identifying Parts of Speech',
        steps: [
          '"The quick brown fox jumps over the lazy dog."',
          'fox = noun, jumps = verb, quick/brown = adjectives',
          'over = preposition, lazy = adjective, dog = noun',
        ],
      },
    ],
    key_takeaways: [
      'Eight parts of speech: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection',
      'Every sentence needs a subject and predicate',
      'Simple = 1 clause; Compound = 2+ independent; Complex = independent + dependent',
    ],
    practice_questions: [
      { id: 'q1', question: 'In "She ran quickly," what part of speech is "quickly"?', options: ['Adjective', 'Adverb', 'Verb', 'Noun'], correct_answer: 1, explanation: '"Quickly" describes the verb "ran," so it is an adverb.' },
      { id: 'q2', question: 'What type is: "I stayed home because it rained."?', options: ['Simple', 'Compound', 'Complex', 'Compound-complex'], correct_answer: 2, explanation: 'Independent + dependent clause = complex.' },
      { id: 'q3', question: 'Which word is a preposition in "The book is on the table"?', options: ['book', 'is', 'on', 'table'], correct_answer: 2, explanation: '"On" shows relationship — it is a preposition.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'The eight parts of speech are the building blocks of English sentences.',
    objectives: [
      'Identify parts of speech',
    ],
    sections: [
      { heading: 'The Eight Parts of Speech', body: 'Noun (dog, city), Pronoun (he, they), Verb (run, is), Adjective (tall, blue), Adverb (quickly, very), Preposition (in, on), Conjunction (and, but), Interjection (Wow!). Every sentence has a subject and predicate. Simple = 1 clause; Compound = 2+ independent; Complex = independent + dependent.' },
    ],
    examples: [
      {
        title: 'Parts of Speech',
        steps: [
          '"The quick fox jumps over the dog."',
          'fox = noun, jumps = verb, over = preposition',
        ],
      },
    ],
    key_takeaways: [
      'Eight parts: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection',
      'Every sentence needs a subject and predicate',
    ],
    practice_questions: [
      { id: 'q1', question: 'In "She ran quickly," what is "quickly"?', options: ['Adjective', 'Adverb', 'Verb', 'Noun'], correct_answer: 1, explanation: 'Describes the verb "ran" — adverb.' },
      { id: 'q2', question: 'Which is a preposition in "The book is on the table"?', options: ['book', 'is', 'on', 'table'], correct_answer: 2, explanation: '"On" shows relationship — preposition.' },
    ],
  } as LessonContent,
};

export const ENG_002_VERSIONS = {
  full: {
    introduction: 'Reading comprehension is the ability to understand, analyze, and draw meaning from what you read. It is not just about decoding words — it is about understanding the author\'s message, identifying key ideas, and making inferences.',
    objectives: [
      'Identify the main idea of a passage',
      'Make inferences from textual evidence',
      'Use context clues to determine word meanings',
      'Distinguish between fact and opinion',
    ],
    sections: [
      { heading: 'Finding the Main Idea', body: 'The main idea is the central point the author wants to convey. It is often stated in the first or last sentence of a paragraph (the topic sentence), but sometimes it is implied. Ask yourself: "What is this paragraph mostly about?" The main idea is supported by details and examples.' },
      { heading: 'Making Inferences', body: 'An inference is a conclusion drawn from evidence and reasoning, not directly stated in the text. For example, if a character slams a door and speaks in a sharp tone, you can infer they are angry, even if the text never says "she was angry." Look for clues in actions, dialogue, and word choice.' },
      { heading: 'Context Clues', body: 'When you encounter an unfamiliar word, use surrounding text to figure out its meaning. Types of context clues: definition (the word is defined right after), synonym (a familiar word with similar meaning nearby), antonym (a contrasting word nearby), and example (an illustration of the word\'s meaning).' },
      { heading: 'Fact vs. Opinion', body: 'A fact is a statement that can be proven true or false. An opinion is a statement of belief or feeling that cannot be proven. "Water boils at 100C" is a fact. "Water boils at 100C is the most interesting fact" is an opinion. Writers often mix facts and opinions; recognizing the difference helps you evaluate arguments.' },
    ],
    examples: [
      {
        title: 'Identifying the Main Idea',
        steps: [
          'Passage: "Solar energy is becoming increasingly popular. Panels are cheaper than ever, and many governments offer tax incentives. Homeowners can save thousands over a panel\'s lifetime."',
          'What is this mostly about? The growing popularity and benefits of solar energy.',
          'Main idea: Solar energy is becoming more accessible and financially beneficial for homeowners.',
        ],
      },
      {
        title: 'Making an Inference',
        steps: [
          'Text: "Maria checked her watch for the third time and glanced at the door. She tapped her foot and sighed."',
          'The text never says Maria is impatient.',
          'But checking her watch repeatedly, glancing at the door, tapping her foot, and sighing are all clues.',
          'Inference: Maria is waiting for someone and feels impatient.',
        ],
      },
    ],
    key_takeaways: [
      'The main idea is the central point, often in the topic sentence',
      'Inferences use textual evidence plus reasoning to go beyond what is stated',
      'Context clues help you figure out unfamiliar words without a dictionary',
      'Facts can be proven; opinions are beliefs that cannot be proven',
    ],
    practice_questions: [
      { id: 'q1', question: 'Read: "The restaurant was packed. Every table was full, and a line stretched out the door." What can you infer?', options: ['The restaurant is unpopular', 'The restaurant is busy and popular', 'The food is bad', 'The restaurant is closing'], correct_answer: 1, explanation: 'A packed restaurant with a line out the door indicates it is busy and popular, even though this is not directly stated.' },
      { id: 'q2', question: 'Which is a fact?', options: ['Pizza is the best food', 'Pizza originated in Italy', 'Pizza is more delicious than burgers', 'Everyone should try pizza'], correct_answer: 1, explanation: 'Pizza originating in Italy is a verifiable historical fact. The others are opinions.' },
      { id: 'q3', question: 'Use context clues: "The chef\'s cooking was sublime — the flavors were heavenly and unforgettable." What does "sublime" mean?', options: ['Terrible', 'Excellent', 'Average', 'Spicy'], correct_answer: 1, explanation: 'The context "heavenly and unforgettable" suggests sublime means excellent or outstanding.' },
      { id: 'q4', question: 'What is the main idea of: "Recycling reduces waste, saves energy, and protects natural resources for future generations."', options: ['Recycling is difficult', 'Recycling has several important benefits', 'Recycling should be mandatory', 'Recycling is new'], correct_answer: 1, explanation: 'The passage lists benefits of recycling, so the main idea is that recycling has several important benefits.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'Reading comprehension means understanding, analyzing, and drawing meaning from what you read. Key skills include finding the main idea, making inferences, and using context clues.',
    objectives: [
      'Identify the main idea',
      'Make inferences from evidence',
      'Use context clues',
    ],
    sections: [
      { heading: 'Main Idea and Inferences', body: 'The main idea is the central point, often in the first or last sentence. An inference is a conclusion from evidence not directly stated — e.g., a character slamming a door suggests anger. Context clues (definition, synonym, antonym, example) help you figure out unfamiliar words.' },
      { heading: 'Fact vs. Opinion', body: 'A fact can be proven true or false. An opinion is a belief that cannot be proven. "Water boils at 100C" is a fact. "Pizza is the best food" is an opinion. Recognizing the difference helps you evaluate arguments.' },
    ],
    examples: [
      {
        title: 'Making an Inference',
        steps: [
          'Text: "Maria checked her watch repeatedly and sighed."',
          'Clue: repeated checking + sighing',
          'Inference: Maria is impatient',
        ],
      },
    ],
    key_takeaways: [
      'Main idea = central point, often in topic sentence',
      'Inferences use evidence + reasoning',
      'Facts can be proven; opinions cannot',
    ],
    practice_questions: [
      { id: 'q1', question: '"The restaurant was packed, with a line out the door." What can you infer?', options: ['Unpopular', 'Busy and popular', 'Food is bad', 'Closing'], correct_answer: 1, explanation: 'A packed restaurant indicates it is busy and popular.' },
      { id: 'q2', question: 'Which is a fact?', options: ['Pizza is the best food', 'Pizza originated in Italy', 'Pizza is better than burgers', 'Everyone should try pizza'], correct_answer: 1, explanation: 'Pizza originating in Italy is verifiable — a fact.' },
      { id: 'q3', question: '"The chef\'s cooking was sublime — heavenly and unforgettable." What does "sublime" mean?', options: ['Terrible', 'Excellent', 'Average', 'Spicy'], correct_answer: 1, explanation: 'Context suggests sublime = excellent.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'Reading comprehension means understanding what you read. Key skills: finding the main idea, making inferences, and using context clues.',
    objectives: [
      'Identify main idea and make inferences',
    ],
    sections: [
      { heading: 'Key Concepts', body: 'Main idea: the central point, often in the first or last sentence. Inference: conclusion from evidence not directly stated. Context clues: surrounding text helps define unfamiliar words. Fact: can be proven. Opinion: cannot be proven (belief or feeling).' },
    ],
    examples: [
      {
        title: 'Inference',
        steps: [
          '"Maria checked her watch repeatedly and sighed."',
          'Inference: Maria is impatient (not stated, but implied).',
        ],
      },
    ],
    key_takeaways: [
      'Main idea = central point of the passage',
      'Inference = conclusion from evidence',
      'Fact = provable; Opinion = not provable',
    ],
    practice_questions: [
      { id: 'q1', question: '"The restaurant was packed with a line out the door." What can you infer?', options: ['Unpopular', 'Busy and popular', 'Food is bad', 'Closing'], correct_answer: 1, explanation: 'Packed = busy and popular.' },
      { id: 'q2', question: 'Which is a fact?', options: ['Pizza is the best', 'Pizza originated in Italy', 'Pizza is better than burgers', 'Everyone should try pizza'], correct_answer: 1, explanation: 'Verifiable historical fact.' },
    ],
  } as LessonContent,
};

export const BIO_001_VERSIONS = {
  full: {
    introduction: 'The cell is the smallest unit of life. All living things — from bacteria to whales — are made of cells. Understanding cell structure is fundamental to biology because every life process, from digestion to reproduction, happens at the cellular level.',
    objectives: [
      'Identify the major organelles of eukaryotic cells',
      'Explain the function of each organelle',
      'Distinguish between plant and animal cells',
      'Compare prokaryotic and eukaryotic cells',
    ],
    sections: [
      { heading: 'The Nucleus', body: 'The nucleus is the control center of the cell. It contains DNA organized into chromosomes. The nucleus directs all cell activities by controlling gene expression. It is surrounded by the nuclear membrane, which has pores that allow molecules to move in and out.' },
      { heading: 'Mitochondria', body: 'Mitochondria are the "powerhouses" of the cell. They carry out cellular respiration, converting glucose and oxygen into ATP (adenosine triphosphate), the energy currency of the cell. Cells that need a lot of energy (like muscle cells) have many mitochondria.' },
      { heading: 'Endoplasmic Reticulum and Golgi', body: 'The rough ER has ribosomes attached and synthesizes proteins. The smooth ER makes lipids and detoxifies harmful substances. The Golgi apparatus receives proteins from the ER, modifies them, packages them into vesicles, and ships them to their destinations.' },
      { heading: 'Plant vs Animal Cells', body: 'Plant cells have three structures animal cells lack: (1) Cell wall — rigid outer layer of cellulose for support. (2) Chloroplasts — contain chlorophyll for photosynthesis. (3) Large central vacuole — stores water and maintains turgor pressure. Animal cells have centrioles and smaller vacuoles.' },
      { heading: 'Prokaryotic vs Eukaryotic', body: 'Prokaryotic cells (bacteria) have no nucleus — DNA floats freely in the cytoplasm. They lack membrane-bound organelles. Eukaryotic cells (plants, animals, fungi) have a true nucleus and organelles. Eukaryotic cells are typically 10x larger.' },
    ],
    examples: [
      {
        title: 'Protein Production Pathway',
        steps: [
          '1. The nucleus sends mRNA with instructions for a protein.',
          '2. Ribosomes on the rough ER read the mRNA and build the protein.',
          '3. The protein enters the ER for initial folding.',
          '4. A vesicle carries the protein to the Golgi apparatus.',
          '5. The Golgi modifies and packages the protein.',
          '6. A vesicle ships the protein to its destination.',
        ],
      },
      {
        title: 'Identifying Cell Type',
        steps: [
          'You see a cell with: a cell wall, chloroplasts, and a large vacuole.',
          'Cell wall = plant cell (not animal)',
          'Chloroplasts = plant cell (for photosynthesis)',
          'Large central vacuole = plant cell',
          'Conclusion: This is a plant cell.',
        ],
      },
    ],
    key_takeaways: [
      'The nucleus controls the cell and contains DNA',
      'Mitochondria produce ATP through cellular respiration',
      'Plant cells have cell walls, chloroplasts, and large vacuoles; animal cells do not',
      'Prokaryotic cells lack a nucleus and organelles; eukaryotic cells have both',
    ],
    practice_questions: [
      { id: 'q1', question: 'Which organelle is the "powerhouse" of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'], correct_answer: 1, explanation: 'Mitochondria produce ATP through cellular respiration, earning the nickname "powerhouse."' },
      { id: 'q2', question: 'Which structure is found in plant cells but NOT animal cells?', options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Cell membrane'], correct_answer: 2, explanation: 'Chloroplasts are found only in plant cells and are the site of photosynthesis.' },
      { id: 'q3', question: 'What is the main difference between prokaryotic and eukaryotic cells?', options: ['Size', 'Prokaryotic cells have no nucleus', 'Eukaryotic cells are smaller', 'Prokaryotic cells have more organelles'], correct_answer: 1, explanation: 'Prokaryotic cells lack a true nucleus and membrane-bound organelles; eukaryotic cells have both.' },
      { id: 'q4', question: 'Which organelle synthesizes proteins?', options: ['Smooth ER', 'Rough ER', 'Golgi apparatus', 'Lysosome'], correct_answer: 1, explanation: 'The rough ER has ribosomes attached and synthesizes proteins. The smooth ER makes lipids.' },
      { id: 'q5', question: 'What is the function of the Golgi apparatus?', options: ['Produce energy', 'Store DNA', 'Modify and package proteins', 'Synthesize lipids'], correct_answer: 2, explanation: 'The Golgi receives proteins from the ER, modifies them, packages them into vesicles, and ships them to their destinations.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'The cell is the smallest unit of life. Eukaryotic cells contain organelles that perform specific functions, from energy production to protein synthesis.',
    objectives: [
      'Identify major organelles and their functions',
      'Distinguish plant and animal cells',
      'Compare prokaryotic and eukaryotic cells',
    ],
    sections: [
      { heading: 'Key Organelles', body: 'Nucleus: control center, contains DNA. Mitochondria: produce ATP (energy). Rough ER: synthesizes proteins. Golgi: modifies and packages proteins. Ribosomes: build proteins from mRNA.' },
      { heading: 'Plant vs Animal vs Prokaryotic', body: 'Plant cells have cell walls, chloroplasts, and large vacuoles — animal cells do not. Prokaryotic cells (bacteria) have no nucleus or membrane-bound organelles; eukaryotic cells (plants, animals) have both.' },
    ],
    examples: [
      {
        title: 'Identifying Cell Type',
        steps: [
          'Cell with cell wall + chloroplasts + large vacuole = plant cell',
          'Cell without these = animal cell',
          'Cell with no nucleus = prokaryotic (bacteria)',
        ],
      },
    ],
    key_takeaways: [
      'Nucleus = control center (DNA); Mitochondria = energy (ATP)',
      'Plant cells have cell walls, chloroplasts, large vacuoles',
      'Prokaryotic = no nucleus; Eukaryotic = has nucleus',
    ],
    practice_questions: [
      { id: 'q1', question: 'Which organelle is the "powerhouse" of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi'], correct_answer: 1, explanation: 'Mitochondria produce ATP.' },
      { id: 'q2', question: 'Which is found in plant cells but NOT animal cells?', options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Cell membrane'], correct_answer: 2, explanation: 'Chloroplasts are only in plant cells.' },
      { id: 'q3', question: 'Main difference between prokaryotic and eukaryotic cells?', options: ['Size', 'Prokaryotic have no nucleus', 'Eukaryotic are smaller', 'Prokaryotic have more organelles'], correct_answer: 1, explanation: 'Prokaryotic cells lack a nucleus; eukaryotic cells have one.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'Cells are the basic unit of life. Key organelles: nucleus (DNA), mitochondria (energy), ribosomes (protein synthesis).',
    objectives: [
      'Identify key organelles',
    ],
    sections: [
      { heading: 'Key Organelles', body: 'Nucleus: contains DNA, controls the cell. Mitochondria: produce ATP (energy). Ribosomes: build proteins. Plant cells have cell walls, chloroplasts, and large vacuoles — animal cells do not. Prokaryotic cells (bacteria) have no nucleus; eukaryotic cells do.' },
    ],
    examples: [
      {
        title: 'Cell Type',
        steps: [
          'Cell wall + chloroplasts = plant cell',
          'No nucleus = prokaryotic (bacteria)',
        ],
      },
    ],
    key_takeaways: [
      'Nucleus = DNA/control; Mitochondria = energy',
      'Plant cells have chloroplasts and cell walls; animal cells do not',
    ],
    practice_questions: [
      { id: 'q1', question: 'Which organelle is the "powerhouse"?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi'], correct_answer: 1, explanation: 'Mitochondria produce ATP.' },
      { id: 'q2', question: 'Which is in plant but not animal cells?', options: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Cell membrane'], correct_answer: 2, explanation: 'Chloroplasts are only in plant cells.' },
    ],
  } as LessonContent,
};

export const BIO_002_VERSIONS = {
  full: {
    introduction: 'Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose. It produces the oxygen we breathe and is the base of nearly every food chain.',
    objectives: [
      'Write the overall equation for photosynthesis',
      'Explain the light-dependent reactions',
      'Explain the Calvin cycle (light-independent reactions)',
      'Understand the role of chlorophyll and chloroplasts',
    ],
    sections: [
      { heading: 'The Overall Equation', body: 'The balanced equation for photosynthesis is: 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2. In words: six molecules of carbon dioxide plus six molecules of water, using light energy, produce one molecule of glucose and six molecules of oxygen.' },
      { heading: 'Light-Dependent Reactions', body: 'These occur in the thylakoid membranes of the chloroplast. Chlorophyll absorbs light energy, which splits water molecules (photolysis) into oxygen, hydrogen ions, and electrons. The electrons travel through the electron transport chain, producing ATP and NADPH. Oxygen is released as a byproduct.' },
      { heading: 'The Calvin Cycle', body: 'Also called light-independent or dark reactions, these occur in the stroma of the chloroplast. CO2 is captured by an enzyme called RuBisCO and fixed into organic molecules using the ATP and NADPH from the light reactions. Through a series of steps, CO2 is converted into G3P, which is used to make glucose.' },
      { heading: 'Chlorophyll and Chloroplasts', body: 'Chlorophyll is the green pigment that absorbs light, primarily red and blue wavelengths, and reflects green (which is why plants look green). Chloroplasts are the organelles where photosynthesis occurs. They contain thylakoids (flattened sacs where light reactions occur) arranged in stacks called grana, surrounded by the stroma (fluid where the Calvin cycle occurs).' },
    ],
    examples: [
      {
        title: 'Tracing a Carbon Atom',
        steps: [
          '1. CO2 enters the leaf through stomata (pores).',
          '2. In the stroma, RuBisCO captures the CO2.',
          '3. The CO2 is attached to a 5-carbon molecule (RuBP).',
          '4. Using ATP and NADPH from light reactions, it is converted to G3P.',
          '5. Two G3P molecules combine to form glucose.',
          '6. The glucose is used by the plant for energy or stored as starch.',
        ],
      },
      {
        title: 'Inputs and Outputs',
        steps: [
          'Light-Dependent Reactions:',
          '  Inputs: H2O, light, NADP+, ADP',
          '  Outputs: O2, ATP, NADPH',
          'Calvin Cycle:',
          '  Inputs: CO2, ATP, NADPH',
          '  Outputs: G3P (-> glucose), NADP+, ADP',
        ],
      },
    ],
    key_takeaways: [
      'Photosynthesis: 6CO2 + 6H2O + light -> C6H12O6 + 6O2',
      'Light reactions (thylakoid) produce ATP, NADPH, and O2',
      'The Calvin cycle (stroma) uses CO2, ATP, and NADPH to make glucose',
      'Chlorophyll absorbs red and blue light, reflects green light',
    ],
    practice_questions: [
      { id: 'q1', question: 'Where do the light-dependent reactions occur?', options: ['Stroma', 'Thylakoid membrane', 'Nucleus', 'Cytoplasm'], correct_answer: 1, explanation: 'Light reactions occur in the thylakoid membrane where chlorophyll and photosystems are located.' },
      { id: 'q2', question: 'What gas is released as a byproduct of photosynthesis?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], correct_answer: 1, explanation: 'Oxygen is released when water is split during the light-dependent reactions.' },
      { id: 'q3', question: 'What is the main product of the Calvin cycle?', options: ['ATP', 'Glucose (via G3P)', 'Oxygen', 'NADPH'], correct_answer: 1, explanation: 'The Calvin cycle uses CO2 to produce G3P, which forms glucose. ATP and NADPH are inputs.' },
      { id: 'q4', question: 'Why do plants appear green?', options: ['They absorb green light', 'They reflect green light', 'They produce green chlorophyll', 'They store green pigments'], correct_answer: 1, explanation: 'Chlorophyll absorbs red and blue light but reflects green light, which is why plants look green.' },
      { id: 'q5', question: 'Which enzyme captures CO2 in the Calvin cycle?', options: ['ATP synthase', 'RuBisCO', 'DNA polymerase', 'Amylase'], correct_answer: 1, explanation: 'RuBisCO is the enzyme that captures CO2 and fixes it into organic molecules in the Calvin cycle.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'Photosynthesis converts light energy into chemical energy stored in glucose. It has two stages: light-dependent reactions and the Calvin cycle.',
    objectives: [
      'Write the overall equation',
      'Explain the two stages',
      'Understand chlorophyll\'s role',
    ],
    sections: [
      { heading: 'The Two Stages', body: 'Overall equation: 6CO2 + 6H2O + light -> C6H12O6 + 6O2. Light-dependent reactions (thylakoid): chlorophyll absorbs light, splits water, produces ATP, NADPH, and releases O2. Calvin cycle (stroma): uses CO2, ATP, and NADPH to make glucose via G3P.' },
      { heading: 'Chlorophyll', body: 'Chlorophyll is the green pigment in chloroplasts that absorbs light (mainly red and blue wavelengths) and reflects green — which is why plants look green. Chloroplasts contain thylakoids (light reactions) and stroma (Calvin cycle).' },
    ],
    examples: [
      {
        title: 'Inputs and Outputs',
        steps: [
          'Light reactions: H2O + light -> ATP + NADPH + O2',
          'Calvin cycle: CO2 + ATP + NADPH -> glucose',
        ],
      },
    ],
    key_takeaways: [
      '6CO2 + 6H2O + light -> C6H12O6 + 6O2',
      'Light reactions produce ATP, NADPH, O2',
      'Calvin cycle uses CO2 to make glucose',
      'Chlorophyll reflects green light',
    ],
    practice_questions: [
      { id: 'q1', question: 'Where do light-dependent reactions occur?', options: ['Stroma', 'Thylakoid membrane', 'Nucleus', 'Cytoplasm'], correct_answer: 1, explanation: 'In the thylakoid membrane.' },
      { id: 'q2', question: 'What gas is released as a byproduct?', options: ['CO2', 'Oxygen', 'Nitrogen', 'Hydrogen'], correct_answer: 1, explanation: 'O2 is released when water is split.' },
      { id: 'q3', question: 'Main product of the Calvin cycle?', options: ['ATP', 'Glucose (via G3P)', 'Oxygen', 'NADPH'], correct_answer: 1, explanation: 'The Calvin cycle produces G3P, which forms glucose.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'Photosynthesis: 6CO2 + 6H2O + light -> C6H12O6 + 6O2. Two stages: light reactions (produce ATP, NADPH, O2) and Calvin cycle (makes glucose).',
    objectives: [
      'Know the equation and two stages',
    ],
    sections: [
      { heading: 'Key Concepts', body: 'Equation: 6CO2 + 6H2O + light -> C6H12O6 + 6O2. Light reactions (thylakoid): split water, produce ATP + NADPH + O2. Calvin cycle (stroma): use CO2 + ATP + NADPH to make glucose. Chlorophyll absorbs red/blue, reflects green.' },
    ],
    examples: [
      {
        title: 'Inputs and Outputs',
        steps: [
          'Light reactions: H2O + light -> ATP + NADPH + O2',
          'Calvin cycle: CO2 + ATP + NADPH -> glucose',
        ],
      },
    ],
    key_takeaways: [
      '6CO2 + 6H2O + light -> C6H12O6 + 6O2',
      'Light reactions = ATP/NADPH/O2; Calvin cycle = glucose',
    ],
    practice_questions: [
      { id: 'q1', question: 'Where do light reactions occur?', options: ['Stroma', 'Thylakoid', 'Nucleus', 'Cytoplasm'], correct_answer: 1, explanation: 'In the thylakoid membrane.' },
      { id: 'q2', question: 'What gas is released by photosynthesis?', options: ['CO2', 'Oxygen', 'Nitrogen', 'Hydrogen'], correct_answer: 1, explanation: 'O2 is released when water is split.' },
    ],
  } as LessonContent,
};

export const CHEM_001_VERSIONS = {
  full: {
    introduction: 'Everything around you is made of atoms. An atom is the smallest unit of an element that retains the properties of that element. Understanding atomic structure is the foundation of all chemistry.',
    objectives: [
      'Identify the three subatomic particles and their properties',
      'Determine atomic number and mass number',
      'Calculate protons, neutrons, and electrons in an atom',
      'Understand isotopes and ions',
    ],
    sections: [
      { heading: 'Subatomic Particles', body: 'Protons: positive charge (+1), in the nucleus, mass = 1 amu. Neutrons: no charge, in the nucleus, mass = 1 amu. Electrons: negative charge (-1), outside the nucleus in electron shells, mass is negligible (about 1/1836 of a proton). The nucleus is tiny but contains nearly all the atom\'s mass.' },
      { heading: 'Atomic Number and Mass Number', body: 'The atomic number (Z) equals the number of protons. It defines the element — every atom with 6 protons is carbon. The mass number (A) equals protons plus neutrons. For a neutral atom, electrons equal protons.' },
      { heading: 'Isotopes', body: 'Isotopes are atoms of the same element (same protons) with different neutrons. Carbon-12 has 6 protons and 6 neutrons; carbon-14 has 6 protons and 8 neutrons. Isotopes have the same chemical properties but different masses. Some isotopes are radioactive.' },
      { heading: 'Ions', body: 'An ion is an atom that has gained or lost electrons. A cation has lost electrons and has a positive charge (Na+). An anion has gained electrons and has a negative charge (Cl-). Ions form to achieve a stable electron configuration.' },
    ],
    examples: [
      {
        title: 'Counting Subatomic Particles',
        steps: [
          'Given: atomic number 11, mass number 23',
          'Protons = atomic number = 11 (sodium, Na)',
          'Neutrons = mass number - protons = 23 - 11 = 12',
          'Electrons = protons (neutral atom) = 11',
        ],
      },
      {
        title: 'Identifying an Ion',
        steps: [
          'An oxygen atom (atomic number 8) gains 2 electrons.',
          'Protons = 8, Electrons = 8 + 2 = 10',
          'Charge = protons - electrons = 8 - 10 = -2',
          'This is the oxide ion: O^2-',
        ],
      },
    ],
    key_takeaways: [
      'Protons (+, nucleus), Neutrons (neutral, nucleus), Electrons (-, outside nucleus)',
      'Atomic number = protons; it defines the element',
      'Mass number = protons + neutrons',
      'Isotopes have same protons, different neutrons; ions have different electrons',
    ],
    practice_questions: [
      { id: 'q1', question: 'How many neutrons does carbon-14 have? (Atomic number 6)', options: ['6', '8', '14', '20'], correct_answer: 1, explanation: 'Neutrons = mass number - protons = 14 - 6 = 8.' },
      { id: 'q2', question: 'What is the charge of an ion with 12 protons and 10 electrons?', options: ['+2', '-2', '+1', '-1'], correct_answer: 0, explanation: 'Charge = protons - electrons = 12 - 10 = +2. This is Mg^2+.' },
      { id: 'q3', question: 'Which subatomic particle determines the identity of an element?', options: ['Neutron', 'Electron', 'Proton', 'All three'], correct_answer: 2, explanation: 'The number of protons (atomic number) defines the element.' },
      { id: 'q4', question: 'How many electrons does a neutral atom of sodium (atomic number 11) have?', options: ['11', '22', '23', '10'], correct_answer: 0, explanation: 'In a neutral atom, electrons = protons = 11.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'Atoms are the building blocks of all matter. Each atom has protons, neutrons, and electrons. The number of protons defines the element.',
    objectives: [
      'Identify subatomic particles',
      'Calculate protons, neutrons, and electrons',
      'Understand isotopes and ions',
    ],
    sections: [
      { heading: 'Subatomic Particles', body: 'Protons (+1, nucleus, 1 amu). Neutrons (neutral, nucleus, 1 amu). Electrons (-1, outside nucleus, negligible mass). Atomic number = protons (defines element). Mass number = protons + neutrons. Neutral atom: electrons = protons.' },
      { heading: 'Isotopes and Ions', body: 'Isotopes: same protons, different neutrons (e.g., C-12 vs C-14). Ions: different electrons. Cation = lost electrons (positive). Anion = gained electrons (negative).' },
    ],
    examples: [
      {
        title: 'Counting Particles',
        steps: [
          'Atomic number 11, mass number 23 (sodium)',
          'Protons = 11, Neutrons = 23-11 = 12, Electrons = 11',
        ],
      },
    ],
    key_takeaways: [
      'Protons (+), Neutrons (neutral), Electrons (-)',
      'Atomic number = protons; Mass number = protons + neutrons',
      'Isotopes: different neutrons; Ions: different electrons',
    ],
    practice_questions: [
      { id: 'q1', question: 'How many neutrons does carbon-14 have? (Atomic number 6)', options: ['6', '8', '14', '20'], correct_answer: 1, explanation: '14 - 6 = 8 neutrons.' },
      { id: 'q2', question: 'Charge of ion with 12 protons and 10 electrons?', options: ['+2', '-2', '+1', '-1'], correct_answer: 0, explanation: '12 - 10 = +2 (Mg^2+).' },
      { id: 'q3', question: 'Which particle determines the element?', options: ['Neutron', 'Electron', 'Proton', 'All'], correct_answer: 2, explanation: 'Number of protons defines the element.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'Atoms have protons (+), neutrons (neutral), and electrons (-). Atomic number = protons. Mass number = protons + neutrons.',
    objectives: [
      'Identify subatomic particles',
    ],
    sections: [
      { heading: 'Key Concepts', body: 'Protons (+1, nucleus). Neutrons (neutral, nucleus). Electrons (-1, outside nucleus). Atomic number = protons (defines element). Mass number = protons + neutrons. Neutral atom: electrons = protons. Isotopes: same protons, different neutrons. Ions: different electrons (cation = +, anion = -).' },
    ],
    examples: [
      {
        title: 'Counting Particles',
        steps: [
          'Sodium: atomic number 11, mass 23',
          'Protons = 11, Neutrons = 12, Electrons = 11',
        ],
      },
    ],
    key_takeaways: [
      'Atomic number = protons; Mass number = protons + neutrons',
      'Isotopes: different neutrons; Ions: different electrons',
    ],
    practice_questions: [
      { id: 'q1', question: 'Neutrons in carbon-14? (Atomic number 6)', options: ['6', '8', '14', '20'], correct_answer: 1, explanation: '14 - 6 = 8.' },
      { id: 'q2', question: 'Charge of 12 protons, 10 electrons?', options: ['+2', '-2', '+1', '-1'], correct_answer: 0, explanation: '12 - 10 = +2.' },
    ],
  } as LessonContent,
};

export const CHEM_002_VERSIONS = {
  full: {
    introduction: 'Chemical bonds are the forces that hold atoms together in compounds. Atoms bond to achieve a stable electron configuration, usually a full outer shell (the octet rule). The three main types are ionic, covalent, and metallic.',
    objectives: [
      'Explain ionic, covalent, and metallic bonding',
      'Draw Lewis structures for simple molecules',
      'Use electronegativity to predict bond type',
      'Relate bond type to material properties',
    ],
    sections: [
      { heading: 'Ionic Bonds', body: 'An ionic bond forms when one atom transfers electrons to another. A metal loses electrons to become a positive cation; a nonmetal gains those electrons to become a negative anion. The opposite charges attract. Example: Na + Cl -> Na+ + Cl- -> NaCl. Ionic compounds have high melting points and conduct electricity when dissolved.' },
      { heading: 'Covalent Bonds', body: 'A covalent bond forms when two atoms share electrons, typically between two nonmetals. If sharing is equal, it is nonpolar covalent (O2). If unequal, it is polar covalent (H2O, where oxygen pulls electrons more strongly).' },
      { heading: 'Metallic Bonds', body: 'In metallic bonding, metal atoms share outer electrons in a "sea of electrons" — a cloud of delocalized electrons flowing through a lattice of positive metal ions. This explains why metals conduct electricity, are malleable, and are ductile.' },
      { heading: 'Electronegativity and Bond Type', body: 'Electronegativity is an atom\'s ability to attract shared electrons. Difference > 1.7 = ionic; 0.4 to 1.7 = polar covalent; < 0.4 = nonpolar covalent. Example: Na (0.9) and Cl (3.0) differ by 2.1, so they form an ionic bond.' },
      { heading: 'Lewis Structures', body: 'Steps: (1) Count total valence electrons. (2) Place the least electronegative atom in the center (never H). (3) Form single bonds, distributing remaining electrons to outer atoms first. (4) Form double or triple bonds if needed to satisfy the octet rule.' },
    ],
    examples: [
      {
        title: 'Drawing a Lewis Structure: H2O',
        steps: [
          '1. Count valence electrons: H(1) + H(1) + O(6) = 8 total',
          '2. Place O in the center (H cannot be central)',
          '3. Form two O-H single bonds (uses 4 electrons)',
          '4. Distribute remaining 4 electrons to O as two lone pairs',
          '5. Check: O has 8 electrons — octet satisfied',
          'Result: H-O-H with two lone pairs on O',
        ],
      },
      {
        title: 'Predicting Bond Type',
        steps: [
          'Compare H (2.1) and Cl (3.0): difference = 0.9 (polar covalent)',
          'Compare Na (0.9) and Cl (3.0): difference = 2.1 (ionic)',
        ],
      },
    ],
    key_takeaways: [
      'Ionic bonds: electron transfer (metal + nonmetal), high melting points',
      'Covalent bonds: electron sharing (nonmetal + nonmetal), polar or nonpolar',
      'Metallic bonds: electron sea (metal + metal), conductive and malleable',
      'Electronegativity difference: >1.7 ionic, 0.4-1.7 polar, <0.4 nonpolar',
    ],
    practice_questions: [
      { id: 'q1', question: 'What type of bond forms between Na (0.9) and Cl (3.0)?', options: ['Nonpolar covalent', 'Polar covalent', 'Ionic', 'Metallic'], correct_answer: 2, explanation: 'Difference = 2.1 > 1.7, so this is an ionic bond.' },
      { id: 'q2', question: 'How many valence electrons are in a water molecule (H2O)?', options: ['4', '6', '8', '10'], correct_answer: 2, explanation: 'H(1) + H(1) + O(6) = 8 valence electrons.' },
      { id: 'q3', question: 'Why do metals conduct electricity?', options: ['They have ionic bonds', 'Their electrons are delocalized in a sea', 'They have covalent bonds', 'They have no electrons'], correct_answer: 1, explanation: 'Delocalized electrons flow freely through the metal lattice, carrying current.' },
      { id: 'q4', question: 'What type of bond is in O2 (O=O)? Electronegativity of O is 3.0.', options: ['Ionic', 'Polar covalent', 'Nonpolar covalent', 'Metallic'], correct_answer: 2, explanation: 'Difference = 0 (same element), which is < 0.4, so it is nonpolar covalent.' },
    ],
  } as LessonContent,
  light: {
    introduction: 'Chemical bonds hold atoms together. The three main types are ionic (electron transfer), covalent (electron sharing), and metallic (electron sea).',
    objectives: [
      'Explain ionic, covalent, and metallic bonds',
      'Use electronegativity to predict bond type',
    ],
    sections: [
      { heading: 'Three Bond Types', body: 'Ionic: metal transfers electrons to nonmetal (NaCl). Covalent: two nonmetals share electrons — polar if unequal (H2O), nonpolar if equal (O2). Metallic: delocalized electrons in a sea of metal ions — conductive, malleable.' },
      { heading: 'Electronegativity', body: 'Difference > 1.7 = ionic. 0.4-1.7 = polar covalent. < 0.4 = nonpolar covalent. Lewis structures show valence electrons as dots; count total valence electrons, place least electronegative atom in center, form bonds, distribute remaining electrons.' },
    ],
    examples: [
      {
        title: 'Predicting Bond Type',
        steps: [
          'Na (0.9) + Cl (3.0): diff = 2.1 > 1.7 → ionic',
          'H (2.1) + Cl (3.0): diff = 0.9 → polar covalent',
        ],
      },
    ],
    key_takeaways: [
      'Ionic: electron transfer; Covalent: electron sharing; Metallic: electron sea',
      'Electronegativity difference: >1.7 ionic, 0.4-1.7 polar, <0.4 nonpolar',
    ],
    practice_questions: [
      { id: 'q1', question: 'Bond between Na (0.9) and Cl (3.0)?', options: ['Nonpolar covalent', 'Polar covalent', 'Ionic', 'Metallic'], correct_answer: 2, explanation: 'Diff = 2.1 > 1.7 → ionic.' },
      { id: 'q2', question: 'Valence electrons in H2O?', options: ['4', '6', '8', '10'], correct_answer: 2, explanation: '1+1+6 = 8.' },
      { id: 'q3', question: 'Why do metals conduct electricity?', options: ['Ionic bonds', 'Delocalized electrons', 'Covalent bonds', 'No electrons'], correct_answer: 1, explanation: 'Delocalized electrons carry current.' },
    ],
  } as LessonContent,
  text: {
    introduction: 'Three bond types: ionic (electron transfer), covalent (sharing), metallic (electron sea). Electronegativity difference predicts bond type.',
    objectives: [
      'Identify bond types',
    ],
    sections: [
      { heading: 'Key Concepts', body: 'Ionic: metal + nonmetal, electron transfer (NaCl). Covalent: nonmetal + nonmetal, electron sharing — polar (H2O) or nonpolar (O2). Metallic: delocalized electron sea, conductive. Electronegativity difference: >1.7 ionic, 0.4-1.7 polar covalent, <0.4 nonpolar. Lewis structures: count valence electrons, place least electronegative in center, form bonds, distribute remaining.' },
    ],
    examples: [
      {
        title: 'Bond Type',
        steps: [
          'Na (0.9) + Cl (3.0): diff = 2.1 → ionic',
          'H (2.1) + Cl (3.0): diff = 0.9 → polar covalent',
        ],
      },
    ],
    key_takeaways: [
      'Ionic = transfer; Covalent = sharing; Metallic = electron sea',
      'Electronegativity diff: >1.7 ionic, 0.4-1.7 polar, <0.4 nonpolar',
    ],
    practice_questions: [
      { id: 'q1', question: 'Bond between Na (0.9) and Cl (3.0)?', options: ['Nonpolar', 'Polar covalent', 'Ionic', 'Metallic'], correct_answer: 2, explanation: 'Diff = 2.1 > 1.7 → ionic.' },
      { id: 'q2', question: 'Why do metals conduct?', options: ['Ionic bonds', 'Delocalized electrons', 'Covalent bonds', 'No electrons'], correct_answer: 1, explanation: 'Free electrons carry current.' },
    ],
  } as LessonContent,
};

// Standalone quiz version-specific questions

export const CS_003_QUIZ_VERSIONS: { full: QuizQuestion[]; light: QuizQuestion[]; text: QuizQuestion[] } = {
  full: [
    { id: 'q1', question: 'What is the time complexity of inserting an element at the beginning of an array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct_answer: 2, explanation: 'Inserting at the beginning requires shifting all existing elements, which is O(n).' },
    { id: 'q2', question: 'Which data structure uses LIFO (Last In, First Out) ordering?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], correct_answer: 1, explanation: 'A stack follows LIFO ordering — the last element pushed is the first one popped.' },
    { id: 'q3', question: 'What is the minimum number of edges in a tree with n nodes?', options: ['n', 'n-1', 'n+1', '2n'], correct_answer: 1, explanation: 'A tree with n nodes always has exactly n-1 edges.' },
    { id: 'q4', question: 'In a hash table with chaining, what is the worst-case time complexity for a lookup?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correct_answer: 2, explanation: 'In the worst case, all keys hash to the same bucket, requiring O(n) traversal.' },
    { id: 'q5', question: 'Which data structure is most efficient for implementing a priority queue?', options: ['Array', 'Linked List', 'Binary Heap', 'Hash Table'], correct_answer: 2, explanation: 'A binary heap provides O(log n) insert and extract-min/max operations.' },
    { id: 'q6', question: 'Which traversal of a BST visits nodes in sorted order?', options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'], correct_answer: 1, explanation: 'In-order traversal (left, root, right) visits BST nodes in ascending order.' },
    { id: 'q7', question: 'What is the amortized time complexity of a dynamic array push?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct_answer: 0, explanation: 'Although occasional resizing costs O(n), amortized over many operations it is O(1).' },
    { id: 'q8', question: 'Which structure allows O(1) access to both the front and back?', options: ['Stack', 'Queue', 'Deque', 'Priority Queue'], correct_answer: 2, explanation: 'A deque (double-ended queue) allows O(1) access and insertion at both ends.' },
  ],
  light: [
    { id: 'q1', question: 'What is the time complexity of inserting at the beginning of an array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct_answer: 2, explanation: 'Requires shifting all elements — O(n).' },
    { id: 'q2', question: 'Which data structure uses LIFO ordering?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], correct_answer: 1, explanation: 'Stack: last in, first out.' },
    { id: 'q3', question: 'Minimum edges in a tree with n nodes?', options: ['n', 'n-1', 'n+1', '2n'], correct_answer: 1, explanation: 'A tree with n nodes has n-1 edges.' },
    { id: 'q4', question: 'Most efficient for a priority queue?', options: ['Array', 'Linked List', 'Binary Heap', 'Hash Table'], correct_answer: 2, explanation: 'Binary heap: O(log n) insert and extract.' },
    { id: 'q5', question: 'Which BST traversal gives sorted order?', options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'], correct_answer: 1, explanation: 'In-order visits BST nodes in ascending order.' },
    { id: 'q6', question: 'Amortized time of dynamic array push?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correct_answer: 0, explanation: 'Amortized O(1) despite occasional resizing.' },
  ],
  text: [
    { id: 'q1', question: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Linked List', 'Tree'], correct_answer: 1, explanation: 'Stack: last in, first out.' },
    { id: 'q2', question: 'Minimum edges in a tree with n nodes?', options: ['n', 'n-1', 'n+1', '2n'], correct_answer: 1, explanation: 'n-1 edges.' },
    { id: 'q3', question: 'Most efficient for a priority queue?', options: ['Array', 'Linked List', 'Binary Heap', 'Hash Table'], correct_answer: 2, explanation: 'Binary heap: O(log n) operations.' },
    { id: 'q4', question: 'Which BST traversal gives sorted order?', options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'], correct_answer: 1, explanation: 'In-order.' },
  ],
};

export const BIO_003_QUIZ_VERSIONS: { full: QuizQuestion[]; light: QuizQuestion[]; text: QuizQuestion[] } = {
  full: [
    { id: 'q1', question: 'Where does photosynthesis occur in plant cells?', options: ['Mitochondria', 'Chloroplasts', 'Nucleus', 'Ribosomes'], correct_answer: 1, explanation: 'Photosynthesis takes place in the chloroplasts, which contain chlorophyll.' },
    { id: 'q2', question: 'What are the two main stages of photosynthesis?', options: ['Glycolysis and Krebs cycle', 'Light reactions and Calvin cycle', 'Respiration and transpiration', 'Transcription and translation'], correct_answer: 1, explanation: 'Photosynthesis consists of light-dependent reactions and the Calvin cycle.' },
    { id: 'q3', question: 'What gas is absorbed during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correct_answer: 2, explanation: 'Plants absorb CO2 from the atmosphere during photosynthesis.' },
    { id: 'q4', question: 'What gas is released as a byproduct of photosynthesis?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Methane'], correct_answer: 1, explanation: 'Oxygen is released as a byproduct when water is split during the light reactions.' },
    { id: 'q5', question: 'Which pigment is primarily responsible for absorbing light?', options: ['Carotenoids', 'Chlorophyll', 'Anthocyanin', 'Xanthophyll'], correct_answer: 1, explanation: 'Chlorophyll is the primary photosynthetic pigment in plants.' },
    { id: 'q6', question: 'What is the overall equation for photosynthesis?', options: ['6CO2 + 6H2O -> C6H12O6 + 6O2', 'C6H12O6 + 6O2 -> 6CO2 + 6H2O', '6CO2 + 12H2O -> C6H12O6 + 6O2 + 6H2O', 'CO2 + H2O -> CH2O + O2'], correct_answer: 0, explanation: 'The balanced equation is 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2.' },
  ],
  light: [
    { id: 'q1', question: 'Where does photosynthesis occur?', options: ['Mitochondria', 'Chloroplasts', 'Nucleus', 'Ribosomes'], correct_answer: 1, explanation: 'In the chloroplasts.' },
    { id: 'q2', question: 'What are the two main stages?', options: ['Glycolysis and Krebs', 'Light reactions and Calvin cycle', 'Respiration and transpiration', 'Transcription and translation'], correct_answer: 1, explanation: 'Light reactions and Calvin cycle.' },
    { id: 'q3', question: 'What gas is absorbed during photosynthesis?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], correct_answer: 2, explanation: 'CO2 is absorbed from the atmosphere.' },
    { id: 'q4', question: 'What gas is released as a byproduct?', options: ['CO2', 'Oxygen', 'Nitrogen', 'Methane'], correct_answer: 1, explanation: 'O2 is released when water is split.' },
    { id: 'q5', question: 'Which pigment absorbs light in photosynthesis?', options: ['Carotenoids', 'Chlorophyll', 'Anthocyanin', 'Xanthophyll'], correct_answer: 1, explanation: 'Chlorophyll is the primary pigment.' },
  ],
  text: [
    { id: 'q1', question: 'Where does photosynthesis occur?', options: ['Mitochondria', 'Chloroplasts', 'Nucleus', 'Ribosomes'], correct_answer: 1, explanation: 'In chloroplasts.' },
    { id: 'q2', question: 'What are the two stages?', options: ['Glycolysis and Krebs', 'Light reactions and Calvin cycle', 'Respiration and transpiration', 'Transcription and translation'], correct_answer: 1, explanation: 'Light reactions + Calvin cycle.' },
    { id: 'q3', question: 'What gas is released?', options: ['CO2', 'Oxygen', 'Nitrogen', 'Methane'], correct_answer: 1, explanation: 'O2 is released.' },
    { id: 'q4', question: 'Which pigment absorbs light?', options: ['Carotenoids', 'Chlorophyll', 'Anthocyanin', 'Xanthophyll'], correct_answer: 1, explanation: 'Chlorophyll.' },
  ],
};

'use client';

import React, { useState, useMemo } from 'react';
import {
    ArrowRight, Home, Zap, Eye, DollarSign, Share2, Check, Star, Users, Cpu, Cloud, FileText,
    ChevronRight, Play, RotateCcw, Download, MessageCircle, Sparkles, Brain, Layers, Building2,
    RotateCw, Navigation, Lightbulb, TrendingUp, BarChart3, Palette, Settings, Shield
} from 'lucide-react';

// Type Definitions
interface PlanDetails {
    rooms: string;
    style: string;
    budget: string;
    size: string;
}

interface Problem {
    text: string;
    icon: React.ReactNode;
}

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}

interface UseCase {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

interface Step {
    number: number;
    title: string;
}

interface FormField {
    label: string;
    key: keyof PlanDetails;
    options: string[];
}

interface CostItem {
    label: string;
    amount: string;
}

interface AnalysisItem {
    label: string;
    icon: string;
    color: string;
}

interface ExportOption {
    label: string;
    icon: React.ReactNode;
    color: string;
}

interface ShareOption {
    label: string;
    icon: React.ReactNode;
    color: string;
    action: () => void;
}

// Component Props Interfaces
interface LandingPageProps {
    onNext: () => void;
}

interface SolutionsPageProps {
    onNext: () => void;
}

interface FeaturesPageProps {
    onNext: () => void;
}

interface DemoPageProps {
    demoStep: number;
    setDemoStep: (step: number) => void;
    planDetails: PlanDetails;
    setPlanDetails: (details: PlanDetails) => void;
    onBack: () => void;
}

interface ProgressBarProps {
    currentStep: number;
}

interface PlanDetailsStepProps {
    planDetails: PlanDetails;
    setPlanDetails: (details: PlanDetails) => void;
}

interface Design2DStepProps {
    planDetails: PlanDetails;
}

interface Design3DStepProps {
    planDetails: PlanDetails;
}

interface CostAnalysisStepProps {
    planDetails: PlanDetails;
}

interface ShareStepProps {
    onShare: (platform: string) => void;
    onRestart: () => void;
    onBack: () => void;
    planDetails: PlanDetails;
}

interface NavigationButtonsProps {
    currentStep: number;
    onPrev: () => void;
    onNext: () => void;
}

// Utility functions for dynamic calculations
const calculateCosts = (planDetails: PlanDetails) => {
    const baseRoomCost = 15000;
    const roomCount = parseInt(planDetails.rooms?.replace(/\D/g, '') || '3');

    const styleMultipliers = {
        'Modern': 1.3,
        'Traditional': 1.1,
        'Minimalist': 1.0,
        'Industrial': 1.2,
        '': 1.1
    };

    const sizeMultipliers = {
        'Small': 0.8,
        'Medium': 1.0,
        'Large': 1.4,
        'Extra Large': 1.8,
        '': 1.0
    };

    const styleKey = planDetails.style.split(' ')[0] as keyof typeof styleMultipliers || '';
    const sizeKey = planDetails.size.split(' ')[0] as keyof typeof sizeMultipliers || '';

    const styleMultiplier = styleMultipliers[styleKey] || 1.1;
    const sizeMultiplier = sizeMultipliers[sizeKey] || 1.0;

    const baseCost = roomCount * baseRoomCost * styleMultiplier * sizeMultiplier;

    return {
        foundation: Math.round(baseCost * 0.25),
        materials: Math.round(baseCost * 0.45),
        labor: Math.round(baseCost * 0.30),
        total: Math.round(baseCost)
    };
};

const getAnalysisData = (planDetails: PlanDetails) => {
    const roomCount = parseInt(planDetails.rooms?.replace(/\D/g, '') || '3');
    const isModern = planDetails.style.includes('Modern');
    const isLarge = planDetails.size.includes('Large');

    return {
        energyRating: isModern ? 'A+' : 'A',
        spaceUtilization: Math.min(95, 85 + roomCount * 2),
        naturalLight: isLarge ? 'Excellent' : 'Good',
        budgetVariance: Math.random() > 0.5 ? '+3%' : '-2%'
    };
};

// Main App Component
const SooruWebsite: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<string>('landing');
    const [demoStep, setDemoStep] = useState<number>(1);
    const [planDetails, setPlanDetails] = useState<PlanDetails>({
        rooms: '',
        style: '',
        budget: '',
        size: ''
    });
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const handleStepTransition = (nextStep: string): void => {
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentStep(nextStep);
            setIsAnimating(false);
        }, 300);
    };

    return (
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
            {currentStep === 'landing' && <LandingPage onNext={() => handleStepTransition('solutions')} />}
            {currentStep === 'solutions' && <SolutionsPage onNext={() => handleStepTransition('features')} />}
            {currentStep === 'features' && <FeaturesPage onNext={() => handleStepTransition('demo')} />}
            {currentStep === 'demo' && (
                <DemoPage
                    demoStep={demoStep}
                    setDemoStep={setDemoStep}
                    planDetails={planDetails}
                    setPlanDetails={setPlanDetails}
                    onBack={() => handleStepTransition('landing')}
                />
            )}
        </div>
    );
};

// Landing Page Component
const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
    const problems: Problem[] = [
        { text: "Struggling to visualize your dream home?", icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" /> },
        { text: "Tired of expensive architect consultations?", icon: <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" /> },
        { text: "Need quick design iterations?", icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" /> },
        { text: "Want to explore multiple design options?", icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" /> },
        { text: "Looking for cost-effective design solutions?", icon: <Brain className="w-4 h-4 sm:w-5 sm:h-5" /> }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-950">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.1),transparent)] pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-10 sm:py-20">
                <div className="text-center mb-16">
                    {/* Logo/Title */}
                    <div className="mb-8">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                            Sooru.AI
                        </h1>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-2xl text-gray-300 px-4">
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                            <span className="text-center">Transforming architectural design through AI innovation</span>
                            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                        </div>
                    </div>

                    {/* Problem Section */}
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-white px-4">
                            Do you face these <span className="text-red-400">challenges</span>?
                        </h2>

                        <div className="grid gap-4 sm:gap-6 mb-12 sm:mb-16 px-4">
                            {problems.map((problem: Problem, index: number) => (
                                <div
                                    key={index}
                                    className="group bg-gray-900/50 backdrop-blur-xl border border-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 
                           transform hover:scale-105 transition-all duration-300 hover:border-red-400/40
                           hover:shadow-lg hover:shadow-red-500/10"
                                >
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="text-red-400 group-hover:text-red-300 transition-colors flex-shrink-0">
                                            {problem.icon}
                                        </div>
                                        <p className="text-sm sm:text-lg text-gray-300 group-hover:text-white transition-colors text-left">
                                            {problem.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={onNext}
                        className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 
                     hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400
                     px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-semibold text-white
                     transform hover:scale-105 transition-all duration-300 
                     shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40 mx-4"
                    >
                        <span className="flex items-center gap-2 sm:gap-3">
                            See Our Solutions
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Solutions Page Component
const SolutionsPage: React.FC<SolutionsPageProps> = ({ onNext }) => {
    const problems: string[] = [
        "Struggling to visualize your dream home?",
        "Tired of expensive architect consultations?",
        "Need quick design iterations?",
        "Want to explore multiple design options?",
        "Looking for cost-effective design solutions?"
    ];

    const solutions: string[] = [
        "AI-powered instant visualization",
        "Affordable design tools for everyone",
        "Real-time design modifications",
        "Unlimited design exploration",
        "Smart cost optimization"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-10 sm:py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white px-4">
                        Sooru.AI <span className="text-blue-400">Solutions</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 px-4">From problems to possibilities</p>

                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 px-4">
                        {/* Problems Column */}
                        <div className="space-y-4 sm:space-y-6">
                            <h3 className="text-2xl sm:text-3xl font-bold text-red-400 mb-6 sm:mb-8">Current Challenges</h3>
                            {problems.map((problem: string, index: number) => (
                                <div
                                    key={index}
                                    className="bg-gray-900/60 backdrop-blur-xl border border-red-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6
                           hover:border-red-400/40 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                                        <p className="text-sm sm:text-base text-gray-300 text-left">{problem}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Solutions Column */}
                        <div className="space-y-4 sm:space-y-6">
                            <h3 className="text-2xl sm:text-3xl font-bold text-blue-400 mb-6 sm:mb-8">Our Solutions</h3>
                            {solutions.map((solution: string, index: number) => (
                                <div
                                    key={index}
                                    className="bg-gray-900/60 backdrop-blur-xl border border-blue-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6
                           hover:border-blue-400/40 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                                        <p className="text-sm sm:text-base text-gray-300 text-left">{solution}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onNext}
                        className="group bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 
                     hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500
                     px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-semibold text-white
                     transform hover:scale-105 transition-all duration-300 
                     shadow-lg shadow-cyan-500/25 mx-4"
                    >
                        <span className="flex items-center gap-2 sm:gap-3">
                            Explore Features
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Features Page Component
const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNext }) => {
    const features: Feature[] = [
        {
            icon: <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Prompt-Based Design Input",
            description: "Natural language input for design specifications with real-time AI guidance",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: <Cpu className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Customizable Components",
            description: "Mix and match different design elements to create your perfect space",
            color: "from-cyan-500 to-blue-500"
        },
        {
            icon: <Eye className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "2D and 3D Visualization",
            description: "Seamlessly generate and switch between 2D and 3D visualizations",
            color: "from-blue-600 to-indigo-500"
        },
        {
            icon: <Brain className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "AI Integration",
            description: "Intelligent design suggestions powered by advanced AI technology",
            color: "from-indigo-500 to-purple-500"
        },
        {
            icon: <FileText className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Export & Sharing",
            description: "Multiple export formats and seamless sharing capabilities",
            color: "from-purple-500 to-blue-500"
        },
        {
            icon: <Cloud className="w-6 h-6 sm:w-8 sm:h-8" />,
            title: "Cloud Storage",
            description: "Secure cloud storage with comprehensive version control",
            color: "from-blue-500 to-cyan-400"
        }
    ];

    const useCases: UseCase[] = [
        {
            title: "Homeowners",
            description: "Design your dream home with AI assistance",
            icon: <Home className="w-8 h-8 sm:w-12 sm:h-12" />,
            color: "from-blue-600 to-cyan-500"
        },
        {
            title: "Architects",
            description: "Rapid prototyping and client presentations",
            icon: <Users className="w-8 h-8 sm:w-12 sm:h-12" />,
            color: "from-cyan-500 to-blue-600"
        },
        {
            title: "Real Estate",
            description: "Showcase property potential to buyers",
            icon: <Star className="w-8 h-8 sm:w-12 sm:h-12" />,
            color: "from-blue-500 to-indigo-500"
        }
    ];

    const upcomingFeatures: string[] = [
        "Collaborative Multi-User Editing",
        "Automated Cost Estimation",
        "Smart Energy Efficiency Analysis",
        "AR/VR Integration"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-10 sm:py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white px-4">
                        Powerful <span className="text-blue-400">Features</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-400 mb-12 sm:mb-16 px-4">Everything you need to bring your vision to life</p>

                    {/* Current Features */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 px-4">
                        {features.map((feature: Feature, index: number) => (
                            <div
                                key={index}
                                className="group bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 
                         transform hover:scale-105 transition-all duration-300 hover:border-blue-500/50
                         hover:shadow-lg hover:shadow-blue-500/10"
                            >
                                <div className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-4 sm:mb-6`}>
                                    <div className="text-white">{feature.icon}</div>
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-300 transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Use Cases */}
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-white px-4">Perfect for</h2>
                    <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 px-4">
                        {useCases.map((useCase: UseCase, index: number) => (
                            <div
                                key={index}
                                className="group bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-8 sm:p-10 
                         transform hover:scale-105 transition-all duration-300 hover:border-blue-500/50"
                            >
                                <div className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-r ${useCase.color} mb-4 sm:mb-6`}>
                                    <div className="text-white">{useCase.icon}</div>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-blue-300 transition-colors">
                                    {useCase.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                                    {useCase.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Upcoming Features */}
                    <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-white px-4">
                        Coming <span className="text-cyan-400">Soon</span>
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16 max-w-4xl mx-auto px-4">
                        {upcomingFeatures.map((feature: string, index: number) => (
                            <div
                                key={index}
                                className="bg-gray-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-lg sm:rounded-xl p-4 sm:p-6
                         hover:border-cyan-400/40 transition-all duration-300"
                            >
                                <div className="flex items-center gap-3">
                                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
                                    <span className="text-sm sm:text-base text-gray-300 text-left">{feature}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onNext}
                        className="group bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 
                     hover:from-purple-600 hover:via-blue-600 hover:to-cyan-400
                     px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-semibold text-white
                     transform hover:scale-105 transition-all duration-300 
                     shadow-lg shadow-purple-500/25 mx-4"
                    >
                        <span className="flex items-center gap-2 sm:gap-3">
                            Try Live Demo
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Demo Page Component
const DemoPage: React.FC<DemoPageProps> = ({ demoStep, setDemoStep, planDetails, setPlanDetails, onBack }) => {
    const handleNextStep = (): void => {
        if (demoStep < 5) {
            setDemoStep(demoStep + 1);
        }
    };

    const handlePrevStep = (): void => {
        if (demoStep > 1) {
            setDemoStep(demoStep - 1);
        }
    };

    const handleShare = (platform: string): void => {
        const shareText = "🏠 Just designed my dream home using Sooru.AI! 🎨✨ This AI-powered architectural tool is amazing - from concept to 3D visualization in minutes! Check it out: sooru.ai #Architecture #AI #HomeDesign";

        if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`);
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(59,130,246,0.1),transparent)] pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-10 sm:py-20">
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white px-4">
                        Live <span className="text-blue-400">Demo</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-400 px-4">Experience the power of AI-driven architectural design</p>
                </div>

                {/* Progress Bar */}
                <ProgressBar currentStep={demoStep} />

                {/* Demo Content */}
                <div className="max-w-5xl mx-auto px-4">
                    {demoStep === 1 && (
                        <PlanDetailsStep
                            planDetails={planDetails}
                            setPlanDetails={setPlanDetails}
                        />
                    )}
                    {demoStep === 2 && (
                        <Design2DStep planDetails={planDetails} />
                    )}
                    {demoStep === 3 && (
                        <Design3DStep planDetails={planDetails} />
                    )}
                    {demoStep === 4 && (
                        <CostAnalysisStep planDetails={planDetails} />
                    )}
                    {demoStep === 5 && (
                        <ShareStep
                            onShare={handleShare}
                            onRestart={() => { setDemoStep(1); setPlanDetails({ rooms: '', style: '', budget: '', size: '' }); }}
                            onBack={onBack}
                            planDetails={planDetails}
                        />
                    )}

                    {/* Navigation Buttons */}
                    {demoStep < 5 && (
                        <NavigationButtons
                            currentStep={demoStep}
                            onPrev={handlePrevStep}
                            onNext={handleNextStep}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Progress Bar Component
const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
    const steps: Step[] = [
        { number: 1, title: "Plan Details" },
        { number: 2, title: "2D Design" },
        { number: 3, title: "3D Visualization" },
        { number: 4, title: "Cost Analysis" },
        { number: 5, title: "Share & Export" }
    ];

    return (
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="flex justify-between items-center mb-4 sm:mb-6 px-4">
                {steps.map((step: Step) => (
                    <div key={step.number} className="flex flex-col items-center">
                        <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-lg mb-2 transition-all duration-300 ${step.number <= currentStep
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-gray-700 text-gray-400'
                            }`}>
                            {step.number <= currentStep ? (
                                step.number < currentStep ? <Check className="w-4 h-4 sm:w-6 sm:h-6" /> : step.number
                            ) : step.number}
                        </div>
                        <span className={`text-xs sm:text-sm font-medium text-center ${step.number <= currentStep ? 'text-blue-300' : 'text-gray-500'
                            }`}>
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 sm:h-3 mx-4">
                <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 sm:h-3 rounded-full transition-all duration-500 shadow-lg shadow-blue-500/25"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

// Individual Step Components
const PlanDetailsStep: React.FC<PlanDetailsStepProps> = ({ planDetails, setPlanDetails }) => {
    const formFields: FormField[] = [
        {
            label: "Number of Rooms",
            key: "rooms",
            options: ["", "2 Rooms", "3 Rooms", "4 Rooms", "5+ Rooms"]
        },
        {
            label: "Style Preference",
            key: "style",
            options: ["", "Modern", "Traditional", "Minimalist", "Industrial"]
        },
        {
            label: "Budget Range",
            key: "budget",
            options: ["", "$50k - $100k", "$100k - $200k", "$200k - $500k", "$500k+"]
        },
        {
            label: "House Size",
            key: "size",
            options: ["", "Small (< 1500 sq ft)", "Medium (1500-2500 sq ft)", "Large (2500-4000 sq ft)", "Extra Large (4000+ sq ft)"]
        }
    ];

    const handleInputChange = (key: keyof PlanDetails, value: string): void => {
        setPlanDetails({ ...planDetails, [key]: value });
    };

    return (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-white text-center">
                Step 1: Specify Your <span className="text-blue-400">Plan Details</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                {formFields.map((field: FormField) => (
                    <div key={field.key}>
                        <label className="block text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-300">
                            {field.label}
                        </label>
                        <select
                            className="w-full p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800/50 border border-gray-600/50 text-white
                       focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200
                       backdrop-blur-sm text-sm sm:text-base"
                            value={planDetails[field.key]}
                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                        >
                            {field.options.map((option: string, index: number) => (
                                <option key={index} value={option} className="bg-gray-800">
                                    {option || "Select..."}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Design2DStep: React.FC<Design2DStepProps> = ({ planDetails }) => (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-white text-center">
            Step 2: <span className="text-blue-400">2D Design</span> Generated
        </h2>
        <div className="bg-gradient-to-br from-gray-800/50 to-blue-900/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 border border-blue-500/20">
            <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-blue-900/30 to-cyan-900/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-blue-500/30">
                <div className="text-center text-white px-4">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <Building2 className="w-16 h-16 sm:w-20 sm:h-20 text-blue-300" />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-blue-300">2D Floor Plan</h3>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6">Generated based on your specifications</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 text-sm sm:text-base bg-gray-900/40 rounded-lg sm:rounded-xl p-4 sm:p-6 backdrop-blur-sm">
                        <div className="text-blue-300">Rooms: <span className="text-white">{planDetails.rooms || 'N/A'}</span></div>
                        <div className="text-blue-300">Style: <span className="text-white">{planDetails.style || 'N/A'}</span></div>
                        <div className="text-blue-300">Budget: <span className="text-white">{planDetails.budget || 'N/A'}</span></div>
                        <div className="text-blue-300">Size: <span className="text-white">{planDetails.size || 'N/A'}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-xl text-blue-300 mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>AI has generated your personalized 2D floor plan!</span>
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
        </div>
    </div>
);

const Design3DStep: React.FC<Design3DStepProps> = ({ planDetails }) => (
    <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-white text-center">
            Step 3: <span className="text-blue-400">3D Visualization</span>
        </h2>
        <div className="bg-gradient-to-br from-gray-800/50 to-purple-900/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 border border-purple-500/20">
            <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-purple-900/30 to-blue-900/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-purple-500/30">
                <div className="text-center text-white px-4">
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <Home className="w-16 h-16 sm:w-20 sm:h-20 text-purple-300" />
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-purple-300">Interactive 3D Model</h3>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8">Experience your {planDetails.style || 'dream'} design in stunning detail</p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-6">
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                            <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
                            Rotate View
                        </button>
                        <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
                            <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                            Walk Through
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-xl text-purple-300 mb-4">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Experience your {planDetails.rooms?.replace(' Rooms', '') || '3'}-room home in stunning 3D!</span>
                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
        </div>
    </div>
);

const CostAnalysisStep: React.FC<CostAnalysisStepProps> = ({ planDetails }) => {
    const costs = useMemo(() => calculateCosts(planDetails), [planDetails]);
    const analysis = useMemo(() => getAnalysisData(planDetails), [planDetails]);

    const costItems: CostItem[] = [
        { label: "Foundation & Structure", amount: `${costs.foundation.toLocaleString()}` },
        { label: "Materials & Finishes", amount: `${costs.materials.toLocaleString()}` },
        { label: "Labor & Installation", amount: `${costs.labor.toLocaleString()}` }
    ];

    const analysisItems: AnalysisItem[] = [
        { label: `Energy Efficiency: ${analysis.energyRating} Rating`, icon: "lightbulb", color: "text-green-400" },
        { label: `Space Utilization: ${analysis.spaceUtilization}% Optimal`, icon: "settings", color: "text-blue-400" },
        { label: `Natural Light: ${analysis.naturalLight}`, icon: "sun", color: "text-yellow-400" },
        { label: `Budget Variance: ${analysis.budgetVariance} (Within Range)`, icon: "trending", color: "text-green-400" }
    ];

    const getAnalysisIcon = (iconType: string) => {
        switch (iconType) {
            case 'lightbulb': return <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />;
            case 'settings': return <Settings className="w-5 h-5 sm:w-6 sm:h-6" />;
            case 'sun': return <Zap className="w-5 h-5 sm:w-6 sm:h-6" />;
            case 'trending': return <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />;
            default: return <Star className="w-5 h-5 sm:w-6 sm:h-6" />;
        }
    };

    return (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-white text-center">
                Step 4: <span className="text-blue-400">Cost & Analysis</span>
            </h2>
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-gray-800/40 backdrop-blur-xl border border-green-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-green-400">
                        <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                        Cost Breakdown
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                        {costItems.map((item: CostItem, index: number) => (
                            <div key={index} className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-700/50">
                                <span className="text-sm sm:text-base text-gray-300">{item.label}</span>
                                <span className="font-bold text-sm sm:text-base text-white">{item.amount}</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-4 sm:pt-6 border-t-2 border-green-500/30">
                            <span className="font-bold text-lg sm:text-xl text-green-400">Total Estimated Cost</span>
                            <span className="font-bold text-xl sm:text-2xl text-green-400">${costs.total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-xl border border-blue-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center text-blue-400">
                        <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
                        Smart Analysis
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                        {analysisItems.map((item: AnalysisItem, index: number) => (
                            <div key={index} className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-gray-900/30 rounded-lg sm:rounded-xl">
                                <div className={item.color}>
                                    {getAnalysisIcon(item.icon)}
                                </div>
                                <span className={`font-medium text-sm sm:text-base ${item.color}`}>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 sm:mt-8 text-center">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-lg sm:text-xl text-blue-300">
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>AI-powered analysis ensures optimal design and cost efficiency</span>
                    <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
            </div>
        </div>
    );
};

const ShareStep: React.FC<ShareStepProps> = ({ onShare, onRestart, onBack, planDetails }) => {
    const costs = useMemo(() => calculateCosts(planDetails), [planDetails]);

    const exportOptions: ExportOption[] = [
        { label: "Download PDF Report", icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />, color: "from-blue-600 to-blue-500" },
        { label: "Export CAD Files", icon: <Download className="w-4 h-4 sm:w-5 sm:h-5" />, color: "from-green-600 to-green-500" },
        { label: "Save 3D Model (STL)", icon: <Download className="w-4 h-4 sm:w-5 sm:h-5" />, color: "from-purple-600 to-purple-500" }
    ];

    const shareOptions: ShareOption[] = [
        {
            label: "Share on WhatsApp",
            icon: <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />,
            color: "from-green-500 to-green-600",
            action: () => onShare('whatsapp')
        },
        {
            label: "Share on Twitter",
            icon: <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />,
            color: "from-blue-400 to-blue-500",
            action: () => onShare('twitter')
        },
        {
            label: "Copy Share Link",
            icon: <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />,
            color: "from-gray-600 to-gray-700",
            action: () => navigator.clipboard?.writeText('https://sooru.ai/demo/shared-design-123')
        }
    ];

    return (
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-center text-white">
                Step 5: <span className="text-blue-400">Share Your Creation</span>
            </h2>

            <div className="text-center mb-8 sm:mb-12">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-green-500/25">
                    <Check className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-green-400">Design Complete!</h3>
                <p className="text-base sm:text-xl text-gray-300 mb-4 sm:mb-8 px-4">
                    Your {planDetails.style || 'AI-generated'} {planDetails.rooms?.replace(' Rooms', '') || '3'}-room design
                    (${costs.total.toLocaleString()}) is ready to share
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                <div className="bg-gray-800/40 backdrop-blur-xl border border-blue-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                    <h4 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-blue-400 flex items-center gap-2">
                        <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />
                        Export Options
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                        {exportOptions.map((option: ExportOption, index: number) => (
                            <button
                                key={index}
                                className={`w-full bg-gradient-to-r ${option.color} hover:scale-105 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl 
                           flex items-center justify-center gap-2 sm:gap-3 font-semibold text-white
                           transition-all duration-200 shadow-lg text-sm sm:text-base`}
                            >
                                {option.icon}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8">
                    <h4 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-400 flex items-center gap-2">
                        <Palette className="w-5 h-5 sm:w-6 sm:h-6" />
                        Share Your Design
                    </h4>
                    <div className="space-y-3 sm:space-y-4">
                        {shareOptions.map((option: ShareOption, index: number) => (
                            <button
                                key={index}
                                onClick={option.action}
                                className={`w-full bg-gradient-to-r ${option.color} hover:scale-105 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl 
                           flex items-center justify-center gap-2 sm:gap-3 font-semibold text-white
                           transition-all duration-200 shadow-lg text-sm sm:text-base`}
                            >
                                {option.icon}
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center">
                <button
                    onClick={onRestart}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 
                   px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-lg sm:text-xl font-semibold text-white transform hover:scale-105 
                   transition-all duration-200 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
                    Try Another Design
                </button>
                <button
                    onClick={onBack}
                    className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 
                   px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl text-lg sm:text-xl font-semibold text-white transform hover:scale-105 
                   transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentStep, onPrev, onNext }) => (
    <div className="flex justify-between mt-8 sm:mt-12">
        <button
            onClick={onPrev}
            disabled={currentStep === 1}
            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base ${currentStep === 1
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 hover:bg-gray-600 text-white hover:scale-105 shadow-lg'
                }`}
        >
            ← Previous
        </button>
        <button
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 
               px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-white transform hover:scale-105 
               transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center gap-2 text-sm sm:text-base"
        >
            Next Step <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
    </div>
);

export default SooruWebsite;
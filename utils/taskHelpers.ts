export const getPriorityColor = (level: string) => {
    switch (level.toLowerCase()) {
        case 'low':
            return '#4B4376';
        case 'medium':
            return '#c56424ff';
        case 'high':
            return '#B82132';
        default:
            return 'grey';
    }
};

export const formatDueText = (days: number) => {
    const abs = Math.abs(days);
    const plural = abs === 1 ? 'day' : 'days';

    switch (true) {
        case days === 0:
            return 'Due\nToday';
        case days > 0:
            return `Due in\n${abs} ${plural}`;
        default:
            return `Overdue by\n${abs} ${plural}`;
    }
};
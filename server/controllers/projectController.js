const Project = require('../models/Project');
const User = require('../models/User');
const { validateCreateProject } = require('../middlewares/projectFormValidation');
const { validateAddProjectUpdate } = require('../middlewares/projectUpdateValidation');
const { validPaymentData } = require('../middlewares/projectPaymentMiddleware');


exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id)
            .populate('creator', 'name bio')
            .exec();

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.createProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, description, category, fundingGoal, duration, images, rewards } = req.body;

        const newProject = await Project.create({
            title,
            description,
            category,
            fundingGoal,
            duration,
            images,
            rewards,
            creator: userId,
            time: Date.now(),
            currentFunding: 0,
            backersCount: 0,
            backers: [],
        });
        res.status(201).json(newProject);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: `Unexpected error occurred.Please Try again` });
    }
}

exports.editProject = async (req, res) => {
    try {
        const { id, title, description, category, fundingGoal, duration, images, rewards } = req.body;
        const userId = req.user.id;
        const ProjectDoc = await Project.findById(id);
        if (userId === ProjectDoc.creator.toString()) {
            ProjectDoc.set({
                title, description, category, fundingGoal,
                duration, images, rewards
            });
            await ProjectDoc.save();
            res.status(200).json('Succesfully Updated');
        } else {
            res.status(403).json({ error: 'You are not authorized to edit this project.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.deleteProject = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.user.id;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (userId !== project.creator.toString()) {
            return res.status(403).json({ error: 'Unauthorized Access' });
        }

        await Project.deleteOne({ _id: projectId });
        res.json('Project deleted succesfully');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.addProjectUpdates = async (req, res) => {
    const { projectId } = req.params;
    const { title, message } = req.body;

    try {
        const project = await Project.findById(projectId);
        console.log(projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        project.updates.push({
            title,
            message
        })

        await project.save();
        res.json({ projectId, updates: project.updates });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


exports.pledgeProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const projectId = req.params.id;
        const { amount } = req.body;

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount)) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const project = await Project.findById(projectId);
        const user = await User.findById(userId);
        const hasFunded = user.fundedProjects.some((fundedProject) => fundedProject.projectId.toString() === projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        if (userId === project.creator.toString()) {
            return res.status(403).json({ error: 'Project owner cannot fund their own project' });
        }

        if (project.currentFunding >= project.fundingGoal) {
            return res.status(403).json({ error: 'Project funding goal has been reached' });
        }

        if (hasFunded) {
            return res.status(403).json({ error: 'You have already funded this project.' });
        }

        if (!isNaN(parsedAmount)) {
            project.currentFunding += parsedAmount;
        }
        project.backersCount += 1;
        project.backers.push({ userId, amount });
        user.fundedProjects.push({ projectId, amount });

        project.completionPercentage = calculateCompletionPercentage(project.currentFunding, project.fundingGoal);


        await project.save();
        await user.save();


        res.json({ message: 'Funding successfull', project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function calculateCompletionPercentage(currentFunding, fundingGoal) {
    if (fundingGoal <= 0) {
        return 0;
    }

    const completionPercentage = (currentFunding / fundingGoal) * 100;
    return Math.min(completionPercentage, 100);
}

exports.getAllProjects = async (req, res) => {
    try {
        const allProjects = await Project.find()
            .populate('creator', 'name bio')
            .exec();

        res.json({ allProjects });
    } catch (error) {
        console.error('Error Fetching Details:', error.message);
        res.status(500).json({ error });
    }
}

exports.getCategoryProjects = async (req, res) => {
    try {
        const category = req.params.category;
        const categoryProjects = await Project.find({ category: new RegExp(category, 'i') })
            .populate('creator', 'name bio')
            .exec();
        res.status(200).json({ categoryProjects });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


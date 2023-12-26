const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticateUser } = require('../middlewares/authenticateMiddleware');
const { validateCreateProject } = require('../middlewares/projectFormValidation');
const { validateAddProjectUpdate } = require('../middlewares/projectUpdateValidation');
const { validatePaymentData } = require('../middlewares/projectPaymentMiddleware');


router.get('/:id', projectController.getProjectById);

router.get('/', projectController.getAllProjects);

router.get('/category/:category', projectController.getCategoryProjects);

router.post('/new', authenticateUser, validateCreateProject, projectController.createProject);

router.put('/edit/:id', authenticateUser, projectController.editProject);

router.delete('/delete/:id', authenticateUser, projectController.deleteProject);

router.put('/add-update/:projectId', authenticateUser, validateAddProjectUpdate, projectController.addProjectUpdates);

router.post('/pledge/:id', authenticateUser, validatePaymentData, projectController.pledgeProject);


module.exports = router;

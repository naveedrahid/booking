const Role = require('../models/roleModel'); 

const checkPermission = () => {
  return async (req, res, next) => {
    try {
        const user = req.user;
        // console.log(user);
      if (!user) return res.status(401).json({ message: 'Unauthorized' });

      const role = await Role.findById(user.role_id).populate('permissions');
      if (!role) return res.status(403).json({ message: 'Role not found' });

      const method = req.method;
      const routePath = req.route.path;

      const hasPermission = role.permissions.some(p =>
        p.method === method && p.route === routePath
      );

      if (hasPermission) {
        // console.log(`✅ Access granted: [${method}] ${routePath}`);
        return next();
      } else {
        // console.log(`⛔ Access denied: [${method}] ${routePath}`);
        return res.status(403).json({ message: 'Forbidden' });
      }

    } catch (error) {
    //   console.error('Permission check failed:', error.message);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = checkPermission;
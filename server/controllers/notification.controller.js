const { Notification } = require('../models');

// @desc    Get user's notifications
// @route   GET /api/notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { UserId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: 20
    });

    const unreadCount = await Notification.count({
      where: {
        UserId: req.user.id,
        isRead: false
      }
    });

    res.json({
      success: true,
      notifications,
      unreadCount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notifications',
      error: error.message
    });
  }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOne({
      where: { id: req.params.id, UserId: req.user.id }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    notification.isRead = true;
    await notification.save();

    res.json({
      success: true,
      notification
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating notification',
      error: error.message
    });
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.update(
      { isRead: true },
      { where: { UserId: req.user.id, isRead: false } }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating notifications',
      error: error.message
    });
  }
};

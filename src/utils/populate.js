const user = async (tx, id) => {
  const user = await tx.user.findUnique({
    where: { id },
    include: {
      presets: {
        orderBy: { index: "asc" },
        include: { preset_ai_link_parent: true },
      },
      plans: {
        include: {
          preset_ai_plan: {
            select: { preset: true },
          },
          preset_plan: {
            select: { preset: true },
            orderBy: { preset: { index: "asc" } },
          },
        },
      },
      plants: {
        include: {
          customdata: {
            orderBy: { preset: { index: "asc" } },
            include: { preset: true },
          },
        },
      },
    },
  });
  if (user.plans) {
    user.plans = user.plans.map((el) => {
      el.preset_plan = el.preset_plan.map((el) => el.preset);
      return el;
    });
  }
  return user;
};

module.exports.populate = { user };

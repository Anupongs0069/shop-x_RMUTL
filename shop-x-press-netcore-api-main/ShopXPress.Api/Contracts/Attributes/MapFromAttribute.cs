namespace ShopXPress.Api.Contracts.Attributes;

/// <summary>
    /// Define data contract to be map with entity.
    /// Beware about the related entity, it will map to the nested entity also.
    /// </summary>
    /// <param name="targetType"></param>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class MapToAttribute : Attribute
    {
        Type targetType;

        public MapToAttribute(Type targetType)
        {
            this.targetType = targetType;
        }

        public Type TargetType => targetType;
    }

    /// <summary>
    /// Define entity to be map with the data contract.
    /// </summary>
    /// <param name="targetType"></param>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class MapFromAttribute : Attribute
    {
        Type fromType;

        public MapFromAttribute(Type targetType)
        {
            this.fromType = targetType;
        }

        public Type FromType => fromType;
    }
